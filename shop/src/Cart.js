import React, {useEffect, memo} from 'react';
import {Table} from 'react-bootstrap';
import {connect} from 'react-redux';

function Cart(props) {
    function alertClose(props) {
        props.dispatch({
            type: 'alert닫기'
        })
    }
    return (
        <div>
            <Table responsive>
                <thead>
                <tr>
                    <th>#</th>
                    {Array.from(['상품명', '수량', '변경']).map((_, index) => (
                        <th key={index}>{_}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {
                    props.state.map((value, index, array) => {
                        return (
                            <tr>
                                <td>{value.id}</td>
                                <td>{value.name}</td>
                                <td>{value.quan}</td>
                                <td>
                                    <button type="button" onClick={() => {
                                        // 데이터 수정 요청을 할 땐 props.dispatch()
                                        props.dispatch({
                                            type: '수량증가',
                                            index: value.id,
                                            // payload - 화물에 물건 실어서 보내듯이 아래와 같이 dispatch할 때마다 데이터를 보낼 수 있음.
                                            payload: {
                                                name: 'kim'
                                            }
                                        })
                                    }}>+</button>
                                    <button type="button" onClick={() => {
                                        props.dispatch({
                                            type: '수량감소',
                                            index: value.id,
                                        })
                                    }}>-</button>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>
            {
                props.alert === true ?
                    (<div className="my-alert2">
                        <p>지금 구매하시면 신규할인 20%</p>
                        <button type="button" onClick={() => {
                            props.dispatch({
                                type: 'alert닫기'
                            })
                        }}>닫기</button>
                    </div>) : null
            }
            <Parent name="존박" age="20"></Parent>
        </div>
    )
}

function Parent(props) {
    return (
        <div>
            <Child1 name={props.name}/>
            <Child2 age={props.age}/>
        </div>
    )
}

function Child1(props) {
    // useEffect 로딩, 재렌더링시 실행할 코드
    useEffect(() => { console.log('렌더링됨1') })
    return <div>1111</div>
}

let Child2 = memo(function () {
    useEffect(() => { console.log('렌더링됨2') })
    return <div>2222</div>
})

// redux store 데이터 가져와서 props로 변환해주는 함수
function stateProps(state) {
    return {
        state: state.reducer,
        alert: state.reducer2
    }
}

export default connect(stateProps)(Cart)

// export default Cart;