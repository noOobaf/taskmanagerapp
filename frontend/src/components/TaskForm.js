import React, { useState } from 'react';
import { addTask } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const TaskForm = ({ onTaskAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await addTask(title, description);
            setTitle('');
            setDescription('');
            if (onTaskAdded) onTaskAdded();
            toast.success('Task added!');
        } catch (err) {
            setError(err.response?.data?.error || 'Error');
            toast.error('Failed to add task');
        }
    };

    return (
        <div className="task-form-card">
            <h2 className="task-form-title">Add a New Task</h2>
            <form className="task-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <div className="task-form-actions">
                    <button type="submit">Add Task</button>
                    <button type="button" className="view-tasks-btn" onClick={() => navigate('/tasks')}>View All Tasks</button>
                </div>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
};

export default TaskForm;
