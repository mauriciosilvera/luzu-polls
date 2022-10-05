import axios from 'axios';
import { auth } from './auth';

export const Login = (data) =>
  axios
    .post('https://luzutv-api.herokuapp.com/public/login', data)
    .then((response) => response)
    .catch((error) => error);

export const pollPost = async (data) => {
  const token = auth.getData();
  const config = {
    headers: { token }
  };
  try {
    const response = await axios.post(
      'https://luzutv-api.herokuapp.com/admin/poll',
      data,
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const pollPut = async (data) => {
  const token = auth.getData();
  const config = {
    headers: { token }
  };
  try {
    const response = await axios.put(
      'https://luzutv-api.herokuapp.com/admin/poll',
      data,
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const pollPostExtraOption = async (data) => {
  const token = auth.getData();
  const config = {
    headers: { token }
  };
  try {
    const response = await axios.post(
      'http://luzutv-api.herokuapp.com/admin/poll/answer',
      data,
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const allPollsPost = async () => {
  const token = auth.getData();
  const config = {
    headers: { token }
  };
  try {
    const response = await axios.post(
      'https://luzutv-api.herokuapp.com/admin/polls',
      {
        filters: {}
      },
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getActivePoll = async () => {
  const token = auth.getData();
  const config = {
    headers: { token }
  };
  try {
    const response = await axios.post(
      'https://luzutv-api.herokuapp.com/public/polls',
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getEmissions = async () => {
  const token = auth.getData();
  const config = {
    headers: { token }
  };
  try {
    const response = await axios.get(
      'https://luzutv-api.herokuapp.com/admin/emissions',
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deletePoll = async (reqData) => {
  const token = auth.getData();
  const config = {
    headers: {
      'Content-Type': 'application/json',
      token
    },
    data: reqData
  };

  try {
    const response = await axios.delete(
      'https://luzutv-api.herokuapp.com/admin/poll',
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteOption = async (optionId) => {
  const token = auth.getData();
  const config = {
    headers: {
      'Content-Type': 'application/json',
      token
    },
    data: [
      {
        answers: {
          id: optionId
        }
      }
    ]
  };

  try {
    const response = await axios.delete(
      'https://luzutv-api.herokuapp.com/admin/poll',
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPollById = async (pollId) => {
  const token = auth.getData();
  const config = {
    headers: { token }
  };
  try {
    const response = await axios.post(
      'https://luzutv-api.herokuapp.com/admin/poll/id',
      {
        question_id: pollId
      },
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const vote = (data) => {
  axios
    .post('https://luzutv-api.herokuapp.com/public/vote', data)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};
