import { useEffect, useState } from "react";
import { CLPublicKey } from "casper-js-sdk";


function App() {
  const [page, setPage] = useState(1);
  const [accounthash, setAccounthash] = useState('015a854af99bab51dd0e4da071a67e02c67b69c6d5f2ef47cb524c2222f4f106f4');
  const [items, setItems] = useState([]);
  
  
  const result = CLPublicKey.fromHex(accounthash).toAccountHashStr();
  function nextPage(){
    setPage(page + 1)
  }
  function prevPage(){
    setPage(page - 1)
  }
  useEffect(() => {
    fetch('https://event-store-api-clarity-mainnet.make.services/accounts/'+ result.split("-")[2] +'/transfers?page='+ page +'&limit=10&order_direction=DESC')
    .then(res => res.json())
    .then((result) => {
      setItems(result.data);
    })
  },[page, result])

  
  
  // console.log(result.split("-")[2]);
  // console.log(accounthash);
  return (
    <div style={{ textAlign:"center"}}>
      <h3>Account Transaction Statement</h3>
      <form>
        <input type="text" value={accounthash} onChange={(e) => setAccounthash(e.target.value)} name="account hash" id="" />
      </form>
      <table>
        <tr>
          <th>timestamp</th>
          {/* <th>fromAccount</th> */}
          <th>toAccount</th>
          <th>Amount</th>
        </tr>
        {items.map(item => (
          <tr>
            <td>{item.timestamp}</td>
            {/* <td>{item.fromAccount}</td> */}
            <td>{item.toAccount}</td>
            <td>{item.amount}</td>
          </tr>
        ))}
      </table>
      <button onClick = {prevPage}>
        prev
      </button>
      <button onClick = {nextPage}>
        next
      </button>
    </div>
  );
}

export default App;
