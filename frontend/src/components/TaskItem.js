import React from 'react';

const TaskItem = ({ task, onComplete, onDelete, onEdit }) => {
    return (
        <div className={`task-item${task.is_completed ? ' completed' : ''}`}>
            <div>
                <strong>{task.title}</strong>
                <p>{task.description}</p>
            </div>
            <div>
                {!task.is_completed && (
                    <button onClick={() => onComplete(task.id)}>Complete</button>
                )}
                <button onClick={() => onEdit(task)}>Edit</button>
                <button onClick={() => onDelete(task.id)}>Delete</button>
            </div>
        </div>
    );
};

export default TaskItem;
