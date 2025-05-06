import React, { useEffect, useState } from 'react';
import { getTasks, completeTask, deleteTask } from '../services/api';
import TaskItem from './TaskItem';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const TasksPage = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const navigate = useNavigate();

    const fetchTasks = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await getTasks();
            setTasks(res.data);
        } catch (err) {
            setError('Failed to load tasks');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleComplete = async (id) => {
        try {
            await completeTask(id);
            fetchTasks();
            toast.success('Task completed!');
        } catch (err) {
            setError('Failed to complete task');
            toast.error('Failed to complete task');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            fetchTasks();
            toast.info('Task deleted');
        } catch (err) {
            setError('Failed to delete task');
            toast.error('Failed to delete task');
        }
    };

    const startEdit = (task) => {
        setEditId(task.id);
        setEditTitle(task.title);
        setEditDescription(task.description);
    };

    const cancelEdit = () => {
        setEditId(null);
        setEditTitle('');
        setEditDescription('');
    };

    const saveEdit = async () => {
        try {
            await import('../services/api').then(api => api.updateTask(editId, editTitle, editDescription));
            cancelEdit();
            fetchTasks();
            toast.success('Task updated!');
        } catch (err) {
            setError('Failed to update task');
            toast.error('Failed to update task');
        }
    };

    return (
        <div className="task-list-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 className="task-form-title">Your Tasks</h2>
                <button className="create-task-btn" onClick={() => navigate('/')}>
                    <span className="back-icon">&#8592;</span> Create New Task
                </button>
            </div>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : tasks.length === 0 ? (
                <div>No tasks found.</div>
            ) : (
                tasks.map((task) => (
                    editId === task.id ? (
                        <div className="task-item editing" key={task.id}>
                            <input
                                value={editTitle}
                                onChange={e => setEditTitle(e.target.value)}
                                className="edit-task-input"
                            />
                            <input
                                value={editDescription}
                                onChange={e => setEditDescription(e.target.value)}
                                className="edit-task-input"
                            />
                            <button onClick={saveEdit}>Save</button>
                            <button onClick={cancelEdit}>Cancel</button>
                        </div>
                    ) : (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onComplete={handleComplete}
                            onDelete={handleDelete}
                            onEdit={() => startEdit(task)}
                        />
                    )
                ))
            )}
        </div>
    );
};

export default TasksPage;
