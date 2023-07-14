function AllData() {
    const [data, setData] = React.useState([]);

    React.useEffect(() => {

        fetch('/account/all')
            .then(response => response.json())
            .then(data => {
                setData(data);
            });

    }, []);

    return (<>
        <h5>All Data in Store:</h5>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Balance</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.password}</td>
                            <td>{item.balance}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </>);
}
