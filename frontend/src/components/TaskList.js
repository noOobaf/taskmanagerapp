import React, { useEffect, useState } from 'react';
import { getTasks, completeTask, deleteTask } from '../services/api';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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
        // eslint-disable-next-line
    }, []);

    const handleComplete = async (id) => {
        try {
            await completeTask(id);
            fetchTasks();
        } catch (err) {
            setError('Failed to complete task');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            fetchTasks();
        } catch (err) {
            setError('Failed to delete task');
        }
    };

    return (
        <div className="task-list-container">
            <h2>Your Tasks</h2>
            <TaskForm onTaskAdded={fetchTasks} />
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : tasks.length === 0 ? (
                <div>No tasks found.</div>
            ) : (
                tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onComplete={handleComplete}
                        onDelete={handleDelete}
                    />
                ))
            )}
        </div>
    );
};

export default TaskList;
