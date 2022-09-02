import { useState } from "react";

export default function Index() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState("");

  async function Handler(e) {
    e.preventDefault();

    setLoading("Loading pak ...");

    const getData = await fetch("https://git.taqin.tech:1338/pwned/" + input);
    const resData = await getData.json();

    console.log(loading);
    setData(resData);

    setLoading(
      "kalo tidak ada, bisa di coba sekali lagi <br> kalau masih kosong kemungkinan email anda aman"
    );
  }
  function inputHandler(e) {
    const data = e.target.value;
    setInput(data);
  }

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="container mx-auto md:p-8">
        <div className="">
          <form
            onSubmit={Handler}
            className=" my-4 p-16 grid grid-cols-1 place-items-center w-fit mx-auto bg-white pt-8 rounded-md shadow-md drop-shadow "
          >
            <h2 className="text-3xl text-center">
              Cek keamanan email anda di sini
            </h2>
            <input
              type="email"
              className="border-2 p-2 px-8 text-xl my-3 rounded-xl"
              onChange={inputHandler}
              placeholder="lawak@gmail.com"
            ></input>{" "}
            <br></br>
            <button
              type="submit"
              className="px-5 p-2 text-xl bg-blue-300 text-white rounded-md w-fit"
            >
              Cek email
            </button>
            <p
              className="text-center text-sm font-medium opacity-60 py-4"
              dangerouslySetInnerHTML={{ __html: loading }}
            />
          </form>
          <div className="grid grid-cols-1 gap-4 pt-8">
            {data.map((res) => {
              const { nama, judul, logo, tanggal, deskripsi } = res;
              return (
                <div key={nama} className="border-t-2 border-slate-400 p-4">
                  <img src={logo} alt="logo" className="w-[40px] h-[40px]" />
                  <p className="text-xl font-semibold">{nama}</p>
                  <p className="italic">{tanggal}</p>
                  <p
                    className="opacity-80 text-sm font-medium"
                    dangerouslySetInnerHTML={{ __html: deskripsi }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
