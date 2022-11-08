import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useIdleTimer, workerTimers} from 'react-idle-timer'
import {Modal} from 'antd';

export const IdleTimerContainer = ({children}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [timer, setTimer] = useState(60);
    const navigate = useNavigate();


    const onIdle = () => {
        setIsModalOpen(false);
        navigate("/login");
    }


    const onActive = () => {
        idleTimer.activate();
    }


    const onPrompt = () => {
        setIsModalOpen(true);
    }

    const idleTimer = useIdleTimer({
        timeout: 1000 * 60 * 20,
        promptTimeout: 1000 * 60,
        timer: workerTimers,
        onIdle,
        onActive,
        onPrompt
    })

    useEffect( () => {
        const timeOut = setInterval( () => {
            setTimer(Math.floor(idleTimer.getRemainingTime()/ 1000));
        }, 1000);
        return () => clearInterval(timeOut);
    },[]);

    const handleOk = () => {
        setIsModalOpen(false);
        localStorage.removeItem("auth-jwt");
        navigate("/login");
      };

    const handleCancel = () => {+
        setIsModalOpen(false);
        idleTimer.activate();
      };


    return (
        <div>
            {children}
            <Modal
            title="Where did you go?"
            open={isModalOpen}
            visible={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Logout"
            okButtonProps={{
                danger: true,
                type: "primary"
            }}
            cancelText="Stay"
            cancelButtonProps={{
                type: "primary"
            }}
            >
                <p>You are about to be signed out in {timer} seconds</p>
            </Modal>
        </div>
    )
}