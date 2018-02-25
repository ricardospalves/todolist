(function(win, doc) {
	'use strict';

	var todolist = (function() {

		var $formTask = doc.querySelector('[data-js="c-formTask"]');
		var $formTaskInput = doc.querySelector('[data-js="c-formTask__input"]');
		var $tasksList = doc.querySelector('[data-js="c-tasksList"]');
		var taskId = 1;

		return {
			init: function init() {
				todolist.initEvents();
			},

			initEvents: function initEvents() {
				$formTask.addEventListener('submit', todolist.handleEventCreateTask, false);
			},

			handleEventCreateTask: function handleEventCreateTask(event) {
				event.preventDefault();
				todolist.task();
				todolist.clearFormTaskInput();
				todolist.focusFormTaskInput();
			},

			task: function task() {
				var fragment = doc.createDocumentFragment();
				var $task = doc.createElement('div');
				var $taskInputToggle = doc.createElement('div');
				var $taskInputToggleInput = doc.createElement('input');
				var $taskInputToggleLabel = doc.createElement('label');
				var $taskLabel = doc.createElement('label');
				var $taskButtonDelete = doc.createElement('button');
				var taskClassName = 'c-tasksList__task';
				var taskInputToggleBlockClassName = 'o-inputToggle';
				var taskInputToggleInputID = 'task-' + taskId;

				$taskInputToggleInput.setAttribute('type', 'checkbox');

				$taskInputToggleInput.id = taskInputToggleInputID;
				$taskInputToggleLabel.setAttribute('for', taskInputToggleInputID);
				$taskLabel.setAttribute('for', taskInputToggleInputID);
				$taskButtonDelete.setAttribute('title', 'Delete this task');

				$taskInputToggleInput.name = 'checkbox-task';

				$task.classList.add(taskClassName);
				$taskLabel.classList.add(taskClassName + 'Label');
				$taskButtonDelete.classList.add(taskClassName + 'BtnDelete', 'o-btn');

				$taskInputToggle.classList.add(taskClassName + '-checkbox', taskInputToggleBlockClassName);
				$taskInputToggleInput.classList.add(taskInputToggleBlockClassName + '__input', 'u-srOnly');
				$taskInputToggleLabel.classList.add(taskInputToggleBlockClassName + '__fake');

				$taskLabel.textContent = $formTaskInput.value;
				$taskButtonDelete.innerHTML = '<svg class="o-btn__icon"><use xlink:href="#icon-delete"/></svg>';
				$taskInputToggleLabel.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="' + taskInputToggleBlockClassName + '__check"><path d="M9.333 15.173l-4.786-4.786-1.88 1.893 6.666 6.666 12-12-1.88-1.892"/></svg>';

				$taskInputToggleInput.addEventListener('change', function() {
					var taskCompletedClassName = 'is-completed';

					if( this.checked )
						$task.classList.add(taskCompletedClassName);
					else
						$task.classList.remove(taskCompletedClassName);
				}, false);
				$taskButtonDelete.addEventListener('click', function() {
					$tasksList.removeChild($task);
					todolist.focusFormTaskInput();
				}, false);

				$taskInputToggle.appendChild($taskInputToggleInput);
				$taskInputToggle.appendChild($taskInputToggleLabel);
				$task.appendChild($taskInputToggle);
				$task.appendChild($taskLabel);
				$task.appendChild($taskButtonDelete);
				fragment.appendChild($task);
				$tasksList.appendChild(fragment);
				todolist.taskIdIncrement();
			},

			taskIdIncrement: function taskIdIncrement() {
				return taskId++;
			},

			clearFormTaskInput: function clearFormTaskInput() {
				$formTaskInput.value = '';
			},

			focusFormTaskInput: function focusFormTaskInput() {
				$formTaskInput.focus();
			}
		};

	})();

	todolist.init();

})(window, document);