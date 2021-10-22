import { useEffect, useState } from "react";



function App() {
  const [page, setPage] = useState(1);
  const [accounthash, setAccounthash] = useState();
  const [items, setItems] = useState([]);
  
  function nextPage(){
    setPage(page + 1)
  }
  function prevPage(){
    setPage(page - 1)
  }
  useEffect(() => {
    fetch('https://event-store-api-clarity-mainnet.make.services/accounts/'+ accounthash +'/transfers?page='+ page +'&limit=10&order_direction=DESC')
    .then(res => res.json())
    .then((result) => {
      setItems(result.data);
    })
  },[page, accounthash])

  
  console.log(page);
  return (
    <div style={{ textAlign:"center"}}>
      <h3>Account Transaction Statement</h3>
      <form>
        <input type="text" value={accounthash} onChange={(e) => setAccounthash(e.target.value)} name="account hash" id="" />
      </form>
      <table>
        <tr>
          <th>toAccount</th>
          <th>Amount</th>
        </tr>
        {items.map(item => (
          <tr>
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
