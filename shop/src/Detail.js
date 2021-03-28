import React, {useContext, useEffect, useState} from "react";
import {Nav} from 'react-bootstrap';
import {useHistory, useParams} from "react-router-dom";
import styled from 'styled-components';
import './Detail.scss';
import {stockContext} from './App';
import { CSSTransition } from 'react-transition-group';

let Box = styled.div`
  padding: 20px;
`;

let Title = styled.h4`
  font-size: 25px;
  color: ${props => props.color}
`;

function Detail(props) {

    let [alert, alertEdit] = useState(true);
    let [value, valueEdit] = useState("");
    let stock = useContext(stockContext);

    let [tab, tabEdit] = useState(0);
    let [onOff, onOffEdit] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log("실행");
            alertEdit(false);
        }, 2000)

        return () => {
            clearTimeout(timer);
        }
    }, [alert]);
    useEffect(() => {
        return () => {
            console.log("이것도 실행?");
        }
    })

    // url 파라미터 저장
    let { id } = useParams();
    let idNum;
    for (let i = 0; i < props.shoes.length; i++) {
        if (Number(id) === props.shoes[i].id) {
            idNum = i;
            break
        }
    }
    // props.shoes.forEach((value, index, array) => {
    //     if (Number(id) === value.id) {
    //         idNum = index;
    //     }
    // })
    // 방문기록 등을 저장해놓는 object
    let history = useHistory();

    return (
        <div className="container">

            <Box>
                <Title className="red">상세페이지</Title>
            </Box>

            <input type="text" onChange={(e) => {
                valueEdit(e.target.value);
            }}/>
            
            {
                alert === true ?
                    (<div className="my-alert2">
                        <p>재고가 얼마남지 않았습니다.</p>
                    </div>) : null
            }

            <div className="row">
                <div className="col-md-6">
                    <img src={`https://codingapple1.github.io/shop/shoes${props.shoes[idNum].id+1}.jpg`} width="100%"/>
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{props.shoes[idNum].title}</h4>
                    <p>{props.shoes[idNum].content}</p>
                    <p>{props.shoes[idNum].price}원</p>
                    <Info i={props.stock[idNum]} />
                    <button className="btn btn-danger" onClick={() => {
                        // state가 배열인지 객체형태인지 항상 생각하자!!!!
                        const newStock = [...props.stock];
                        newStock[idNum] = newStock[idNum] - 1;
                        props.stockEdit(newStock);
                    }}>주문하기</button>
                    <button className="btn btn-danger" onClick={() => {
                        history.goBack();
                    }}>뒤로가기</button>
                </div>
            </div>

            <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
                <Nav.Item>
                    <Nav.Link eventKey="link-0" onClick={() => {
                        tabEdit(0);
                        // 이미 처음 이 페이지, 컴포넌트 로드될 때 TabContent 로드되면서 CSSTransition의 in 속성 값은 true로 바뀌어있음
                        // TabContent에 useEffect 훅으로 인해 로드될 때 in 속성을 true로 바꿨으니깐.
                        // 즉, 그래서 그대로 냅두면 애니메이션은 효과는 실행이 안됨
                        // 그래서 버튼 클릭할 때마다 다시 false로 바꾸고 -> TabContent 컴포넌트 로드될 때 true로 바뀌면서 애니메이션 실행
                        onOffEdit(false);
                    }}>Active</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1" onClick={() => {
                        tabEdit(1);
                        onOffEdit(false);
                    }}>Option 2</Nav.Link>
                </Nav.Item>
            </Nav>

            <CSSTransition in={onOff} classNames="wow" timeout={1000}>
            <TabContent tabNum={tab} onOffEdit={onOffEdit} />
            </CSSTransition>

        </div>
    )
}

function TabContent(props) {

    useEffect(() => {
        props.onOffEdit(true);
    })

    if (props.tabNum === 0) {
        return <div>0번째 내용입니다.</div>
    } else if (props.tabNum === 1) {
        return <div>1번째 내용입니다.</div>
    }
}

function Info(props) {
    return (
        <p>재고: {props.i}</p>
    )
}

export default Detail;