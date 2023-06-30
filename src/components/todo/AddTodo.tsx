import { FormEvent, useState } from 'react';
import { TodoApi } from '../../apis/lib/todo';

interface AddTodoProps {
  fetchTodo: () => void;
}

export default function AddTodo({ fetchTodo }: AddTodoProps) {
  const [todo, setTodo] = useState('');

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(event.currentTarget.value);
  };

  const handleAddTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    TodoApi.create(todo).then(() => {
      // 투두 추가 후 부모에서 todo 목록을 다시 불러와야함
      fetchTodo();
    });
  };

  return (
    <form
      className='m-auto mt-6 flex max-w-md items-center gap-x-4'
      onSubmit={handleAddTodo}
    >
      <input
        id='text'
        name='text'
        type='text'
        data-testid='new-todo-input'
        required
        className='min-w-0 flex-auto rounded-md border-2 border-gray-500 bg-white/5 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
        placeholder='Todo를 작성해주세요. 😀'
        onChange={handleChangeInput}
        value={todo}
      />
      <button
        type='submit'
        data-testid='new-todo-add-button'
        className='flex-none rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500'
      >
        Add
      </button>
    </form>
  );
}
