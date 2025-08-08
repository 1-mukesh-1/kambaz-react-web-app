import { useState, useEffect, useRef } from "react";
import * as client from "./client";
import { FormControl, ListGroup } from "react-bootstrap";
import { TiDelete } from "react-icons/ti";
import { FaPencil } from "react-icons/fa6";
import { FaTrash, FaPlusCircle, FaCheck, FaTimes } from "react-icons/fa";

export default function WorkingWithArraysAsynchronously() {
	const [todos, setTodos] = useState<any[]>([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const editInputRefs = useRef<{ [key: string]: string }>({});

	const updateTodo = async (todo: any) => {
		try {
			await client.updateTodo(todo);
			setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
		} catch (error: any) {
			setErrorMessage(error.response.data.message);
		}
	};

	const editTodo = (todo: any) => {
		const updatedTodos = todos.map((t) =>
			t.id === todo.id ? { ...todo, editing: true } : t
		);
		setTodos(updatedTodos);
		editInputRefs.current[todo.id] = todo.title;
	};

	const saveTodo = async (todo: any) => {
		const updatedTitle = editInputRefs.current[todo.id] || todo.title;
		const updatedTodo = { ...todo, title: updatedTitle, editing: false };
		await updateTodo(updatedTodo);
		delete editInputRefs.current[todo.id];
	};

	const cancelEdit = (todo: any) => {
		const updatedTodos = todos.map((t) =>
			t.id === todo.id ? { ...todo, editing: false } : t
		);
		setTodos(updatedTodos);
		delete editInputRefs.current[todo.id];
	};

	const createTodo = async () => {
		const todos = await client.createTodo();
		setTodos(todos);
	};

	const postTodo = async () => {
		const newTodo = await client.postTodo({
			title: "New Posted Todo",
			completed: false,
		});
		setTodos([...todos, newTodo]);
	};

	const fetchTodos = async () => {
		const todos = await client.fetchTodos();
		setTodos(todos);
	};

	const removeTodo = async (todo: any) => {
		const updatedTodos = await client.removeTodo(todo);
		setTodos(updatedTodos);
	};

	const deleteTodo = async (todo: any) => {
		try {
			await client.deleteTodo(todo);
			const newTodos = todos.filter((t) => t.id !== todo.id);
			setTodos(newTodos);
		} catch (error: any) {
			console.log(error);
			setErrorMessage(error.response.data.message);
		}
	};

	useEffect(() => {
		fetchTodos();
	}, []);

	return (
		<div id="wd-asynchronous-arrays">
			<h3>Working with Arrays Asynchronously</h3>
			{errorMessage && (
				<div
					id="wd-todo-error-message"
					className="alert alert-danger mb-2 mt-2"
				>
					{errorMessage}
				</div>
			)}
			<h4>
				Todos
				<FaPlusCircle
					onClick={createTodo}
					className="text-success float-end fs-3"
					id="wd-create-todo"
				/>
				<FaPlusCircle
					onClick={postTodo}
					className="text-primary float-end fs-3 me-3"
					id="wd-post-todo"
				/>
			</h4>
			<ListGroup>
				{todos.map((todo) => (
					<ListGroup.Item key={todo.id}>
						{!todo.editing && (
							<>
								<FaTrash
									onClick={() => removeTodo(todo)}
									className="text-danger float-end mt-1"
									id="wd-remove-todo"
								/>
								<TiDelete
									onClick={() => deleteTodo(todo)}
									className="text-danger float-end me-2 fs-3"
									id="wd-delete-todo"
								/>
								<FaPencil
									onClick={() => editTodo(todo)}
									className="text-primary float-end me-2 mt-1"
								/>
							</>
						)}
						{todo.editing && (
							<>
								<FaCheck
									onClick={() => saveTodo(todo)}
									className="text-success float-end mt-1 me-2"
									style={{ cursor: 'pointer' }}
									title="Save"
								/>
								<FaTimes
									onClick={() => cancelEdit(todo)}
									className="text-danger float-end mt-1 me-2"
									style={{ cursor: 'pointer' }}
									title="Cancel"
								/>
							</>
						)}
						<input
							type="checkbox"
							defaultChecked={todo.completed}
							className="form-check-input me-2 float-start"
							onChange={(e) =>
								updateTodo({ ...todo, completed: e.target.checked })
							}
							disabled={todo.editing}
						/>
						{!todo.editing ? (
							<span
								style={{
									textDecoration: todo.completed ? "line-through" : "none",
								}}
							>
								{todo.title}
							</span>
						) : (
							<FormControl
								className="w-50 float-start"
								defaultValue={todo.title}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										saveTodo(todo);
									} else if (e.key === "Escape") {
										cancelEdit(todo);
									}
								}}
								onChange={(e) => {
									editInputRefs.current[todo.id] = e.target.value;
								}}
								autoFocus
							/>
						)}
					</ListGroup.Item>
				))}
			</ListGroup>
			<hr />
		</div>
	);
}