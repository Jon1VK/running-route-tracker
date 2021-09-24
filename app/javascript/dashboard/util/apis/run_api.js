import csrf_token from './csrf_token';

export const fetchRuns = () =>
  fetch('/api/runs').then((response) => response.json());

export const createRun = async (run) => {
  const formData = new FormData();
  Object.entries(run).forEach(([key, value]) => {
    formData.append(`run[${key}]`, value);
  });

  const response = await fetch('/api/runs', {
    method: 'POST',
    headers: {
      'X-CSRF-Token': csrf_token,
    },
    body: formData,
  });

  const jsonResponse = await response.json();

  if (!response.ok) {
    return Promise.reject(jsonResponse);
  } else {
    return jsonResponse;
  }
};
