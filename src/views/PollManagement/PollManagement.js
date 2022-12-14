import React, { useEffect } from 'react';
import { IconButton, Button } from '@mui/material';
import { MdDelete as DeleteIcon } from 'react-icons/md';
import {
  deletePoll,
  adminActivePoll,
  pollPut,
  allPollsPostWithoutGroups
} from '../../util/Requests';
import './PollManagement.css';
import { LoadingSpinner, PollCard } from '../../components';

function PollManagement() {
  const [data, setData] = React.useState();
  const [updated, setUpdated] = React.useState(false);
  const [activePoll, setActivePoll] = React.useState();
  const [isActive, setIsActive] = React.useState();

  useEffect(() => {
    allPollsPostWithoutGroups().then((polls) => {
      setData(polls);
    });

    adminActivePoll().then((poll) => {
      setActivePoll(poll);
    });
  }, []);

  useEffect(() => {
    if (updated) {
      allPollsPostWithoutGroups().then((polls) => {
        setData(polls);
      });
      setUpdated(false);
    }
  }, [updated]);

  useEffect(() => {
    if (activePoll) {
      setIsActive(activePoll?.[0]?.is_active);
    }
  }, [activePoll]);

  const handleDeletePoll = async (questionId, e) => {
    e?.stopPropagation();
    const reqData = [
      {
        question: {
          id: questionId
        }
      }
    ];

    const res = await deletePoll(reqData);

    if (res === '') {
      setUpdated(true);
    }
  };

  const handleActivate = (e) => {
    e.preventDefault();

    const reqData = [
      {
        question: {
          id: activePoll?.[0]._id,
          is_active: !isActive
        }
      }
    ];
    setIsActive(!isActive);
    pollPut(reqData);
  };

  return (
    <div
      className={`pollManagementWrapper ${
        !activePoll && !data ? 'loading' : ''
      }`}
    >
      {!activePoll && !data && <LoadingSpinner />}
      {isActive && (
        <>
          <h1 className="title">Encuesta activa</h1>
          <div key={activePoll[0]._id} className="activePollCard">
            <PollCard activePoll question={activePoll[0]} />
            <Button
              onClick={handleActivate}
              size="small"
              className="pollButton"
              type="submit"
              variant="outlined"
              color="error"
              sx={{ width: '300px', height: '35px' }}
            >
              Finalizar encuesta activa
            </Button>
          </div>
        </>
      )}
      {data && (
        <>
          <h1 className="title">Encuestas</h1>
          <div className="pollsWrapper">
            {data?.map((question) => (
              <div key={question?._id} className="pollCard">
                <PollCard question={question} />
                <IconButton
                  onClick={(e) => handleDeletePoll(question?._id, e)}
                  value={question?._id}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}
            <PollCard create />
          </div>
        </>
      )}
    </div>
  );
}

export default PollManagement;
