import { useState } from "react";
import axios from 'axios';
import "./index.css";
function App() {

  const [msg,setMsg] = useState()
  const [status,setstatus] = useState(false)

  function handleMsg(event){
    setMsg(event.target.value)
  }
  function send(){
    setstatus(true)
    axios.post("http://localhost:5000/sendmail",{msg:msg})
    .then((data) => {
      if (data.data === true) {
        alert("Email Sent successfully")
        setstatus(false)
      } else {
        alert("Failed")
      }
    })
  }

  return (
    <div>
      <div className="bg-blue-950 text-white text-center">
        <h1 className="text-2xl font-medium px-5 py-3">BulkMail</h1>
      </div>

      <div className="bg-blue-600 text-white text-center">
        <h1 className="font-medium px-5 py-3">
          We can help your business with sending multiple emails at once
        </h1>
      </div>

      <div className="bg-blue-400 text-white text-center">
        <h1 className="font-medium px-5 py-3">Drag and Drop</h1>
      </div>

      <div className="bg-[#3E87EA] flex flex-col items-center text-black px-5 py-3">
        <textarea
          onChange={handleMsg} value={msg}
          className="bg-white w-[80%] py-2 px-2 outline-none h-32 border border-black rounded-md"
          placeholder="Enter the Email text..."
        ></textarea>

        <div>
          <input
            type="file"
            className="border-4 border-white border-dashed py-4 px-4 mt-5 mb-5"
          />
          <p>Total Emails in the file : 0</p>

          <button onClick={send} className="mx-auto block text-blue-600 bg-white py-2 px-4 mt-2 font-medium border rounded-md hover:bg-blue-950 hover:border-none hover:text-white">
            {status?"Sending...":"Send"}
          </button>
        </div>        
      </div>
      <div className="bg-blue-300 text-white text-center p-18"></div>
      <div className="bg-blue-200 text-white text-center p-18"></div>
    </div>
  );
}

export default App;
