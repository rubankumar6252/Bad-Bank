function Balance() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  
  return (
    <div className="">
      {show ?
        <BalanceForm setShow={setShow} setStatus={setStatus} /> :
        <BalanceMsg setShow={setShow} setStatus={setStatus} />}
    </div>
  )

}

function BalanceMsg(props) {
  return (<>
    <h5>Success</h5>
    <button type="submit"
      className="btn btn-primary"
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
      Check balance again
    </button>
  </>);
}

function BalanceForm(props) {
  const [email, setEmail] = React.useState('');

  function handle() {
    fetch(`/account/findOne/${email}`)
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.parse(text);
          props.setStatus(text);
          props.setShow(false);
          alert(`Your balance is : ${data.balance}`);
        } catch (err) {
          props.setStatus(text)
          console.log('err:', text);
          alert("Enter email or User not found!")
        }
      });
  }

  return (<>

    <div className="balance">
      <div class="card">
        <div class="bg-primary card-headera">
          Balance
        </div>
        <div class="card-body">
          Email<br />
          <input type="input"
            className="form-control"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={e => setEmail(e.currentTarget.value)} /><br />

          <button type="submit"
            className="balstyle"
            onClick={handle}>
            Check Balance
          </button>
        </div>
      </div>
    </div>


  </>);
}