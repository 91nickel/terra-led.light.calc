/* eslint-disable */
import { useState, useEffect } from 'react'
import './App.css'

const defaultValues = {
    a: 5.0,
    b: 3.0,
    h: 2.7,
    h1: 0.9,
    reflection: 0,
    illumination: 4,
    multiplier: 0,
    lamp: 0,
    flow: 0,
}

function App () {

    const [values, setValues] = useState({...defaultValues})

    const illuminations = [
        {name: 'Лестница', value: 20},
        {name: 'Подсобные помещения / Санузлы', value: 50},
        {name: 'Коридор / Архив / Гардероб', value: 75},
        {name: 'Бассейн / Сауна', value: 100},
        {name: 'Жилая комната / Кухня', value: 150},
        {name: 'Конференц зал / Переговорная / Детская комната', value: 200},
        {name: 'Офис / Кабинет / Библиотека', value: 300},
    ]
    const reflections = [
        {name: 'Белый, белые, серый', value: [80, 80, 30]},
        {name: 'Белый, светлые, серый', value: [80, 50, 30]},
        {name: 'Светлый, светлые, серый', value: [70, 50, 20]},
        {name: 'Серый, светлые, серый', value: [50, 50, 10]},
        {name: 'Серый, серые, серый', value: [50, 30, 10]},
        {name: 'Темный, серый, серый', value: [30, 30, 10]},
        {name: 'Темный, темные, темный', value: [0, 0, 0]},
    ]

    const multipliers = [
        {name: 'Очень чистое помещение', value: 1.25},
        {name: 'Чистое помещение', value: 1.50},
        {name: 'Загрязненное помещение', value: 1.75},
        {name: 'Сильно загрязненное помещение', value: 2.00},
    ]

    const lamps = [
        {
            name: 'DVO1201',
            flow: 3600,
            efficiency: 90,
            usage: [
                {index: 0.40, value: [0.45, 0.25, 0.23, 0.22, 0.18, 0.18, 0.14]},
                {index: 0.60, value: [0.55, 0.33, 0.32, 0.30, 0.26, 0.26, 0.19]},
                {index: 0.80, value: [0.63, 0.41, 0.38, 0.36, 0.32, 0.31, 0.24]},
                {index: 1.00, value: [0.68, 0.45, 0.43, 0.41, 0.34, 0.34, 0.27]},
                {index: 1.25, value: [0.72, 0.50, 0.46, 0.43, 0.37, 0.37, 0.30]},
                {index: 1.50, value: [0.76, 0.54, 0.49, 0.47, 0.41, 0.39, 0.32]},
                {index: 2.00, value: [0.79, 0.58, 0.55, 0.49, 0.46, 0.45, 0.37]},
                {index: 2.50, value: [0.85, 0.63, 0.58, 0.56, 0.50, 0.49, 0.40]},
                {index: 3.00, value: [0.94, 0.76, 0.69, 0.63, 0.59, 0.57, 0.50]},
                {index: 4.00, value: [1.08, 0.88, 0.84, 0.77, 0.70, 0.68, 0.62]},
                {index: 5.00, value: [1.08, 0.97, 0.88, 0.82, 0.75, 0.74, 0.68]},
            ],
        }
    ]

    useEffect(() => {
        setValues({...values, flow: lamps[values.lamp].flow})
    }, [])

    function onChange ({target}) {
        // console.log('onChange', target)
        let {name, value} = target
        value = Math.round(value * 100) / 100
        setValues(prevState => ({...prevState, [name]: +value}))
    }

    function onIncrement (name, step) {
        // console.log('onIncrement', name, step)
        step = Math.round(step * 100) / 100
        setValues(prevState => ({...prevState, [name]: Math.round((prevState[name] + step) * 100) / 100}))
    }

    const square = Math.round(values.a * values.b * 100) / 100
    const index = Math.round((square / ((values.h - values.h1) * (values.a + values.b))) * 100) / 100
    const illumination = illuminations[values.illumination].value
    const lamp = lamps[values.lamp]
    const usage = lamp.usage.find(r => r.index >= index).value[values.reflection]
    const multiplier = multipliers[values.multiplier]
    const MF = 1 / multiplier.value

    const count = Math.ceil((illumination * square * 100) / (usage * lamp.efficiency * values.flow * MF))

    // console.log('index', index)
    // console.log('usage', usage)
    // console.log('count', count)

    return (
        <div id="light-calc" className="app">
            <div className="container">
                <div className="row">
                    <form className="col-12">
                        <div className="row header">
                            <div className="col-12">
                                <b>Параметры помещения</b>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label htmlFor="input-length" className="form-label">
                                    Длина (м)
                                </label>
                            </div>
                            <div className="col-6 d-flex">
                                <button
                                    type="button"
                                    className="btn btn-light"
                                    onClick={() => onIncrement('a', -0.5)}
                                >
                                    -
                                </button>
                                <input
                                    name="a"
                                    type="number"
                                    className="form-control"
                                    id="input-length"
                                    step="0.5"
                                    value={values.a}
                                    onInput={onChange}
                                />
                                <button
                                    type="button"
                                    className="btn btn-light"
                                    onClick={() => onIncrement('a', 0.5)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label htmlFor="input-width" className="form-label">
                                    Ширина (м)
                                </label>
                            </div>
                            <div className="col-6 d-flex">
                                <button
                                    type="button"
                                    className="btn btn-light"
                                    onClick={() => onIncrement('b', -0.5)}
                                >
                                    -
                                </button>
                                <input
                                    name="b"
                                    type="number"
                                    className="form-control"
                                    id="input-width"
                                    step="0.5"
                                    value={values.b}
                                    onInput={onChange}
                                />
                                <button
                                    type="button"
                                    className="btn btn-light"
                                    onClick={() => onIncrement('b', 0.5)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label htmlFor="input-height" className="form-label">
                                    Высота (м)
                                </label>
                            </div>
                            <div className="col-6 d-flex">
                                <button
                                    type="button"
                                    className="btn btn-light"
                                    onClick={() => onIncrement('h', -0.1)}
                                >
                                    -
                                </button>
                                <input
                                    name="h"
                                    type="number"
                                    className="form-control"
                                    id="input-height"
                                    step="0.1"
                                    value={values.h}
                                    onInput={onChange}
                                />
                                <button
                                    type="button"
                                    className="btn btn-light"
                                    onClick={() => onIncrement('h', 0.1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label htmlFor="input-work-height" className="form-label">
                                    Высота рабочей поверхности (м)
                                </label>
                            </div>
                            <div className="col-6 d-flex">
                                <button
                                    type="button"
                                    className="btn btn-light"
                                    onClick={() => onIncrement('h1', -0.1)}
                                >
                                    -
                                </button>
                                <input
                                    name="h1"
                                    type="number"
                                    className="form-control"
                                    id="input-work-height"
                                    step="0.1"
                                    value={values.h1}
                                    onInput={onChange}
                                />
                                <button
                                    type="button"
                                    className="btn btn-light"
                                    onClick={() => onIncrement('h1', 0.1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label htmlFor="select-reflection" className="form-label">
                                    Коэффициенты отражающей поверхности (Потолок / Стены / Пол)
                                </label>
                            </div>
                            <div className="col-6 d-flex">
                                <select
                                    name="reflection"
                                    id="select-reflection"
                                    className="form-select"
                                    value={values.reflection}
                                    onChange={onChange}
                                >
                                    {
                                        reflections.map((r, i) => {
                                            return (
                                                <option value={i} key={i}>{`${r.name} (${r.value.join('/')})`}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="row header">
                            <div className="col-12">
                                <b>Параметры освещения</b>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label htmlFor="select-illumination" className="form-label">
                                    Уровень освещенности (лк)
                                </label>
                            </div>
                            <div className="col-6 d-flex">
                                <select
                                    name="illumination"
                                    id="select-multiplier"
                                    className="form-select"
                                    value={values.illumination}
                                    onChange={onChange}
                                >
                                    {
                                        illuminations.map((m, i) => {
                                                return (<option value={i} key={i}>{`${m.name} (${m.value} лк)`}</option>)
                                            }
                                        )
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label htmlFor="select-multiplier" className="form-label">
                                    Коэффициент запаса
                                </label>
                            </div>
                            <div className="col-6">
                                <select
                                    name="multiplier"
                                    id="select-multiplier"
                                    className="form-select"
                                    value={values.multiplier}
                                    onChange={onChange}
                                >
                                    {
                                        multipliers.map((m, i) => {
                                            return (<option value={i} key={i}>{`${m.name} (${m.value})`}</option>)
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="row header">
                            <div className="col-12">
                                <b>Светильник</b>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label htmlFor="input-height" className="form-label">
                                    Световой поток светильника (лм)
                                </label>
                            </div>
                            <div className="col-6 d-flex">
                                <button
                                    type="button"
                                    className="btn btn-light"
                                    onClick={() => onIncrement('flow', -100)}
                                >
                                    -
                                </button>
                                <input
                                    name="flow"
                                    type="number"
                                    className="form-control"
                                    id="input-flow"
                                    step="100"
                                    value={values.flow}
                                    onInput={onChange}
                                />
                                <button
                                    type="button"
                                    className="btn btn-light"
                                    onClick={() => onIncrement('flow', 100)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="row">
                    <div className="col-12">
                        <h2>Светильник: {lamps[values.lamp].name} ({lamps[values.lamp].flow} лм)</h2>
                        <h2>Площадь {square} кв.м.</h2>
                        <h2>Индекс помещения: {index}</h2>
                        <h2>Коэффициент использования: {usage}</h2>
                        <h2>Количество светильников: {count}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
