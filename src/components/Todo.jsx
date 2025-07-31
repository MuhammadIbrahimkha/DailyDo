import React, { useState } from 'react'

const Todo = () => {
      const [tasks, setTasks] = useState([]);
      const [newTask, setNewTask] = useState('');
      const [error, setError] = useState('');
      const [editingTaskId, setEditingTaskId] = useState(null);

      const addTask = () => {
        if (newTask.trim() === '') {
          setError('Please enter a task');
          return;
        }
        if (editingTaskId) {
          setTasks(tasks.map(task => 
            task.id === editingTaskId ? { ...task, text: newTask } : task
          ));
          setEditingTaskId(null);
        } else {
          setTasks([...tasks, { id: Date.now(), text: newTask }]);
        }
        setNewTask('');
        setError('');
      };

      const removeTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
      };

      const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          addTask();
        }
      };

      const refreshTasks = () => {
        setNewTask('');
        setTasks([]);
        setError('');
        setEditingTaskId(null);
      };

      const startEditing = (task) => {
        setNewTask(task.text);
        setEditingTaskId(task.id);
      };

      return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">DailyDo</h1>
            <button 
              onClick={refreshTasks}
              className="refresh-button p-2 bg-gray-200 rounded-full hover:bg-gray-100 transition-colors"
              title="Clear all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button> 
          </div>
          
          <div className="flex mb-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a new task..."
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              onClick={addTask}
              className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {editingTaskId ? 'Update' : 'Add'}
            </button>
          </div>
          
          {error && <p className="text-red-500 mb-4">{error}</p>}
          
          <ul className="space-y-2">
            {tasks.length === 0 ? (
              <li className="text-center py-4 text-gray-500 italic">No tasks yet. Add one above!</li>
            ) : (
              tasks.map(task => (
                <li 
                  key={task.id}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-gray-700 cursor-pointer" onClick={() => startEditing(task)}>
                    {task.text}
                  </span>
                  <button
                    onClick={() => removeTask(task.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    title="Remove task"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </li>
              ))
            )}
          </ul>
          
          {tasks.length > 0 && (
            <div className="mt-4 text-sm text-gray-500">
              {tasks.length} task{tasks.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      );
    };

export default Todo