const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export async function submitMessage(data) {
  const response = await fetch(`${API_BASE_URL}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to submit message');
  }
  return response.json();
}

export async function loginAdmin(email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || 'Login failed');
  }
  return response.json();
}

export async function fetchMessages(token) {
  const response = await fetch(`${API_BASE_URL}/messages`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch messages');
  }
  return response.json();
}

export async function markAsRead(id, token) {
  const response = await fetch(`${API_BASE_URL}/messages/${id}/read`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to mark message as read');
  }
  return response.json();
}

export async function deleteMessage(id, token) {
  const response = await fetch(`${API_BASE_URL}/messages/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to delete message');
  }
  return response.json();
}

// Blogs APIs
export async function fetchBlogs() {
  const response = await fetch(`${API_BASE_URL}/blogs`);
  if (!response.ok) throw new Error('Failed to fetch blogs');
  return response.json();
}

export async function fetchBlogBySlug(slug) {
  const response = await fetch(`${API_BASE_URL}/blogs/${slug}`);
  if (!response.ok) throw new Error('Failed to fetch blog post');
  return response.json();
}

export async function createBlog(data, token) {
  const response = await fetch(`${API_BASE_URL}/blogs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || 'Failed to create blog');
  }
  return response.json();
}

export async function updateBlog(id, data, token) {
  const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update blog');
  return response.json();
}

export async function deleteBlog(id, token) {
  const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to delete blog');
  return response.json();
}

// Team APIs
export async function fetchTeam() {
  const response = await fetch(`${API_BASE_URL}/team`);
  if (!response.ok) throw new Error('Failed to fetch team');
  return response.json();
}

export async function createMember(data, token) {
  const response = await fetch(`${API_BASE_URL}/team`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || 'Failed to add team member');
  }
  return response.json();
}

export async function updateMember(id, data, token) {
  const response = await fetch(`${API_BASE_URL}/team/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update team member');
  return response.json();
}

export async function deleteMember(id, token) {
  const response = await fetch(`${API_BASE_URL}/team/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to delete team member');
  return response.json();
}

