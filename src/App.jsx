import { useState, useEffect } from "react";
import Button from "./components/Button";

const App = () => {
  const newTodos = JSON.parse(localStorage.getItem("todos") || "[]");
  const [todo, setTodo] = useState("");
  const [index, setindex] = useState(0);
  const [isTrue, setIsTrue] = useState(false);
  const [addTodos, setAddTodos] = useState(newTodos);
  const [yakin, setYakin] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [filter, setFilter] = useState(false);
  const [cari, setCari] = useState("");

  const hendeltambah = () => {
    if (todo === "") {
      alert("masukan todo");
      return;
    }
    setAddTodos([...addTodos, todo]);
    setTodo("");
    setIsTrue(false);
    setindex(0);
    setYakin(false);
  };

  const hedelclickhapus = (i) => {
    setDisabled(true);
    setIsTrue(false);
    setYakin(true);
    setindex(i);
    setTodo("");
  };

  const hedelclickubah = (i) => {
    setTodo(addTodos[i]);
    setindex(i);
    setIsTrue(true);
    setYakin(false);
  };

  const hendelsimpan = () => {
    if (todo === "") {
      alert("masukan todo");
      return;
    }
    addTodos.splice(index, 1, todo);
    setAddTodos([...addTodos]);
    setIsTrue(false);
    setYakin(false);
    setTodo("");
    setindex(0);
  };

  useEffect(() => {
    addTodos.sort((a, b) => a.localeCompare(b))
    localStorage.setItem("todos", JSON.stringify(addTodos));
  }, [addTodos]);

  return (
    <div className='border border-1 border-black w-100 h-screen flex flex-col gap-2 justify-center items-center'>
      <h1 className='font-bold text-2xl'>Todo list</h1>
      {isTrue ? (
        <div className='w-96'>
          <input
            placeholder='masukan todo'
            max={10}
            type='text'
            value={todo.length > 10 ? todo.slice(0, 10) : todo}
            onChange={(e) => setTodo(e.target.value)}
            className='border border-1 border-black rounded-lg outline-none px-4 py-1 w-2/4'
          />
          <Button onClick={hendelsimpan} className='rounded-lg ml-2 px-4 py-1 bg-blue-600 text-white hover:bg-blue-700'>
            simpan
          </Button>
          <Button
            onClick={() => {
              setTodo("");
              setIsTrue(false);
              setindex(0);
              setYakin(false);
              setDisabled(false);
            }}
            className='rounded-lg ml-2 px-4 py-1 bg-red-600 text-white hover:bg-red-700'
          >
            batal
          </Button>
        </div>
      ) : (
        <div className='w-96 flex justify-center'>
          <input
            type='text'
            max={10}
            onChange={(e) => {
              setTodo(e.target.value);
            }}
            value={todo.length > 10 ? todo.slice(0, 10) : todo === "" ? todo : disabled ? "" : todo}
            placeholder='masukan todo'
            className='border border-1 border-black rounded-lg outline-none px-4 py-1 w-3/4'
          />
          <Button onClick={hendeltambah} className={`rounded-lg ml-2 px-4 py-1 ${disabled ? "bg-gray-400 hover:bg-gray-400" : "bg-blue-600"} text-white hover:bg-blue-700`} disabled={disabled}>
            tambah
          </Button>
        </div>
      )}

      {yakin && (
        <div className='w-96 flex justify-center gap-1 my-2'>
          <h1 className='font-bold text-xl'>apakah anda yakin untuk menghapus .....?</h1>
          <Button
            onClick={() => {
              const newTodos = addTodos.filter((_, i) => i !== index);
              setAddTodos(newTodos);
              setYakin(false);
              setindex(0);
              setIsTrue(false);
              setTodo("");
              setDisabled(false);
            }}
            className='bg-blue-500 text-white rounded-lg px-5 py-1'
          >
            ya
          </Button>
          <Button
            onClick={() => {
              setYakin(false);
              setindex(0);
              setIsTrue(false);
              setTodo("");
              setDisabled(false);
            }}
            className='bg-red-500 text-white rounded-lg px-3 py-1'
          >
            tidak
          </Button>
        </div>
      )}

      <table className='w-96'>
        <thead>
          <tr>
            <th>no</th>
            <th>todo</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {filter
            ? addTodos
                .filter((todo) => todo.toLowerCase().includes(cari.toLowerCase()))
                .map((todo, index) => (
                  <tr key={index} className='text-center'>
                    <td>{index + 1}</td>
                    <td>{todo}</td>
                    <td>
                      <button onClick={() => hedelclickhapus(index)} className='bg-red-500 text-white rounded-lg px-2 py-1'>
                        hapus
                      </button>
                      <button onClick={() => hedelclickubah(index)} className='bg-blue-500 text-white rounded-lg px-2 py-1 ml-2'>
                        ubah
                      </button>
                    </td>
                  </tr>
                ))
            : addTodos.map((todo, index) => (
                <tr key={index} className='text-center'>
                  <td>{index + 1}</td>
                  <td>{todo}</td>
                  <td>
                    <button onClick={() => hedelclickhapus(index)} className='bg-red-500 text-white rounded-lg px-2 py-1'>
                      hapus
                    </button>
                    <button onClick={() => hedelclickubah(index)} className='bg-blue-500 text-white rounded-lg px-2 py-1 ml-2'>
                      ubah
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
      <div className='w-96 flex justify-center mt-2'>
        <Button onClick={() => setFilter(true)} className={`rounded-lg ml-2 px-4 py-1 ${filter ? "bg-gray-400 text-white" : "bg-blue-600 text-white hover:bg-blue-700"}`}>
          cari
        </Button>
        <Button onClick={() => setFilter(false)} className={`rounded-lg ml-2 px-4 py-1 ${!filter ? "bg-gray-400 text-white" : "bg-blue-600 text-white hover:bg-blue-700"}`}>
          batal
        </Button>
      </div>
      {filter && <input onChange={(e) => setCari(e.target.value)} value={cari} className='w-96 border border-1 border-black rounded-lg outline-none px-4 py-1' type='text' />}

      <div className='w-96 flex justify-center mt-2'>
        <h1 className='font-bold text-xl'>jumlah todo : {filter ? addTodos.filter((todo) => todo.toLowerCase().includes(cari.toLowerCase())).length : addTodos.length}</h1>
      </div>
    </div>
  );
};

export default App;
