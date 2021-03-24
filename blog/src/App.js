import React, { useState } from "react";
import './App.css';

function App() {
    // 아래 title에 저장해볼겁니다.
    let [title, titleEdit] = useState(["남자 코트 추천", "강남 우동 맛집", "우육면 맛집"]);
    let [num, numEdit] = useState(title.map((value, index, array) => {return 0}));
    let [modal, modalEdit] = useState(title.map((value, index, array) => {return false}));

    let [inputValue, inputValueEdit] = useState(""); // 아직 사용자가 입력 안했으므로 빈문자열로 초기화

    function numChange (event, index) {
        console.log(event, event.target);
        const num2 = [...num];
        num2[index] = num2[index] + 1;
        numEdit(num2);
    }

    function modalFunc (event, index) {
        const modal2 = [...modal];
        modal2[index] = !modal2[index];
        console.log(modal2)
        modalEdit(modal2);
    }

    function loopFunc () {
        const arr = [];
        for (let i=0; i<3; i++) {
            arr.push(<div key={ i }>for 반복문 { i }</div>)
        }

        return arr;
    }

    const listMapComponent = data => {
        return data.map((value, index, array) => {
            return (
                <div className="list" key={ value }>
                    <h3> { value } <span onClick={ event => { numChange.call(null, event, index) } }> 👍 </span> { num[index] } </h3>
                    <p>03/08 발행</p>
                    <button type="button" onClick={ event => { modalFunc.call(null, event, index) } }>{ value }</button>
                    <hr/>
                </div>
            )
        })
    }

    return (
        <div className="App">
            <div className="black-nav">
                <p>개발 Blog1</p>
            </div>

            { loopFunc() }

            {listMapComponent(title)}

            {
                title.map((value, index, array) => {
                    return (
                        <div key={ `a${index}` }>
                            <div>{ value }</div>
                            <div>{ index }</div>
                        </div>
                    )
                })
            }

            <Profile/>

            {/* 일단 글 적을 수 있는 UI 생성 */}
            <div className="publish">
                <input type="text" onChange={ (e) => {
                    inputValueEdit(e.target.value)
                } } />
                <button type="button" onClick={ () => {
                    const title2 = [...title];
                    title2.unshift(inputValue);
                    titleEdit(title2);
                } }>저장</button>
            </div>

            {
                title.map((value, index, array) => {
                    return (
                        modal[index] === true ? <Modal title={value} key={ value } /> : null
                    )
                })
            }
        </div>
    );
}

function Modal(props) {
    return (
        <div className="modal">
            <h2>{ props.title }</h2>
            <p>날짜</p>
            <p>상세내용</p>
        </div>
    )
}

export default App;

class Profile extends React.Component {
    constructor() {
        super();
        this.state = { name: "Lee", age: 34 }
    }

    render() {
        return (
            <div>
                <h3>프로필입니다</h3>
                <p>저는 { this.state.name } 입니다.</p>
                <button type="button" onClick={() => {
                    this.setState({ name: "Park" })
                }}>버튼</button>
            </div>
        )
    }
}