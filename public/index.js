import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Basic from './basic/index'
import BasicFrom from './basic-form/index'
import BasicSchema from './basic-schema/index'
import SchemaAntd from './schema-antd/index'
import SchemaAntdEvt from './schema-antd-evt/index'
import SchemaFusion from './schema-fusion/index'
import SchemaFusionEvt from './schema-fusion-evt/index'

const Wrapper = () => {

    const render = (Comp) => () => {
        ReactDOM.render(<Comp></Comp>, document.querySelector('#container'))

    }
    return <div>
        <nav>
            <ul >
                <li onClick={render(Basic)}>Basic</li>
                <li onClick={render(BasicFrom)}>BasicFrom</li>
                <li onClick={render(BasicSchema)}>BasicSchema</li>
                <li onClick={render(SchemaAntd)}>SchemaAntd</li>
                <li onClick={render(SchemaAntdEvt)}>SchemaAntdEvt</li>
                <li onClick={render(SchemaFusion)}>SchemaFusion</li>
                <li onClick={render(SchemaFusionEvt)}>SchemaFusionEvt</li>
            </ul>
        </nav>
        <hr />
        <div id="container"></div>
    </div>
}

ReactDOM.render(<Wrapper></Wrapper>, document.querySelector('#root'))
