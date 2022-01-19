import './App.css';

const Title = (props) => {
  return <h1 style={{ color: props.color }} >
    {props.msg}
  </h1>
}

const Description = () => {
  return <p>This is a description of my website</p>
}

const App = () => {
  return (
    <div className="App">
      <Title color='lightgreen' msg='Yo no sé NADA' />
      <Title msg='pero, por lo menos...' />
      <Title color='grey' msg='soy un poco menos estúpido que ayer' />
      <Description />
    </div>
  );
}

export default App;
