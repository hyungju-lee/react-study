import {Nav, Navbar, NavDropdown, Jumbotron, Button} from 'react-bootstrap';
import './App.css';
import {useState} from "react";
import data from './data';
import Detail from "./Detail";
import axios from 'axios';

import { Link, Route, Switch } from 'react-router-dom';

function App() {

    let [shoes, shoesEdit] = useState(data);
    let [loading, loadingEdit] = useState(false);
    let [stock, stockEdit] = useState([10, 11, 12]);

    return (
        <div className="App">
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">shoeShop</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/detail">Detail</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Switch>
                <Route exact path="/">
                    <Jumbotron className="background">
                        <h1>20% Season OFF!</h1>
                        <p>
                            This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.
                        </p>
                        <p>
                            <Button variant="primary">Learn more</Button>
                        </p>
                    </Jumbotron>
                    <div className="container">
                        <div className="row">
                            {
                                shoes.map((value, index, array) => {
                                    return (
                                        <Item key={index} shoe={value} />
                                    )
                                })
                            }
                            {
                                loading === true ? <Loading /> : null
                            }
                        </div>
                        <button type="button" className="btn btn-primary" onClick={() => {

                            loadingEdit(true);

                            // axios도 fetch도 모두 Promise 활용한 거였군.
                            // then은 요청하고나서 제대로 응답왔을 때. 즉, 성공했을 때
                            // catch는 실패했을 때 실행
                            // then 메소드만으로도 성공, 실패 나눌 수 있긴함. 첫번째 인자 함수가 성공했을 시, 두번째 인자 함수가 실패했을 시
                            // 그런데 그러면 가독성이 떨어져 then, catch로 나누어 쓰는듯.
                            axios.get('https://codingapple1.github.io/shop/data2.json')
                                .then((result) => {
                                    loadingEdit(false);
                                    shoesEdit([...shoes, ...result.data]);
                                })
                                .catch((err) => {
                                    loadingEdit(false);
                                    console.error(err);
                                })
                        }}>더보기</button>
                    </div>
                </Route>
                <Route path="/detail/:id">
                    <Detail shoes={shoes} stock={stock} stockEdit={stockEdit} />
                </Route>
                <Route path="/:id">
                    <div>아무거나</div>
                </Route>
            </Switch>


        </div>
    );
}

function Item(props) {
    return (
        <div className="col-md-4">
            <img src={`https://codingapple1.github.io/shop/shoes${props.shoe.id+1}.jpg`} alt="" width="100%"/>
            <h4>{ props.shoe.title }</h4>
            <p>{ props.shoe.content } & { props.shoe.price }</p>
        </div>
    )
}

function Loading() {
    const arr = [];
    for (let i=0; i<3; i++) {
        arr.push(<div>로딩중입니다.</div>)
    }
    return arr;
}

export default App;
