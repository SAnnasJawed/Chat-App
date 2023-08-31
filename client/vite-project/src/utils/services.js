export const baseUrl = "http://localhost:8000/api";

// Post Request General Method

export const postRequest = async (url, body) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    const data = await response.json();

    if (!response.ok) {
      let message;

      if (data?.message) {
        message = data.message;
      } else {
        message = data;
      }
      return { error: true, message };
    }
    return data;
  } catch (error) {
    throw error;
  }
};

// Get Request General Method

export const getRequest = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) {
    let message = "An Error Occured.....";
    if (data?.message) {
      message = data.message;
    }
    return { error: true, message };
  }
  return data;
};
