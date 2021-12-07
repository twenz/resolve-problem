let data = [
    {
        "name": "group 1",
        "id": 1,
        "parentGroupId": null
    },
    {
        "name": "PrivateGroup",
        "id": 2,
        "parentGroupId": null
    },
    {
        "name": "PG-quiz",
        "id": 3,
        "parentGroupId": null
    },
    {
        "name": "PG-question",
        "id": 4,
        "parentGroupId": null
    },
    {
        "name": "PVG-1",
        "id": 5,
        "parentGroupId": 2
    },
    {
        "name": "SupG-6",
        "id": 6,
        "parentGroupId": 5
    },
    {
        "name": "Sub-7",
        "id": 7,
        "parentGroupId": 6
    },
    {
        "name": "Sub-8",
        "id": 8,
        "parentGroupId": 6
    },
    {
        "name": "Sub-9",
        "id": 9,
        "parentGroupId": 10
    },
    {
        "name": "Sub-10",
        "id": 10,
        "parentGroupId": null
    }
]
data = JSON.stringify(data)
data = JSON.parse(data)

// const findPnt = (params) => {
//     const fndArr = params.reduce((pre, cur, curIdx, arr) => {
//         const initCur = {
//             title: cur.name || cur.title,
//             key: cur.id || cur.key,
//             parentGroupId: cur.parentGroupId,
//             children: cur.children || []
//         }
//         if (!cur.parentGroupId) return [...pre, initCur]
//         const pnt = pre.find(e => e.key === cur.parentGroupId)
//         if (!pnt) return pre.concat(initCur)
//         const pntIdx = pre.findIndex(e => e.key === cur.parentGroupId)
//         pre[pntIdx] = { ...pre[pntIdx], children: pre[pntIdx]?.children ? pre[pntIdx].children.concat(initCur) : [initCur] }
//         return pre
//     }, [])
//     return fndArr
// }
const reduceNode = (params) => {
    const rd = params.reduce((pre, cur, curIdx, arr) => {
        if (!cur.parentGroupId) return arr
        const findLast = arr.find(e => e.parentGroupId === cur.key)
        if (findLast) return arr
        const par = arr.find(e => e.key === cur.parentGroupId)
        const parIdx = arr.findIndex(e => e.key === cur.parentGroupId)
        if (!par || !parIdx) return arr
        arr[parIdx].children = arr[parIdx].children.concat(cur)
        const _curIdx = arr.findIndex(e => cur.key === e.key)
        arr.splice(_curIdx, 1)
        return arr
    }, [])
    return rd
}

const init = (params) => {
    data = data.map(e => {
        return {
            title: e.name,
            key: e.id,
            parentGroupId: e.parentGroupId,
            children: []
        }
    })
    let exit = true
    let curData = data
    do {
        const _curData = reduceNode(curData)
        const nullNode = _curData.find(e => e.parentGroupId !== null)
        if (!nullNode) exit = false
        curData = _curData
    } while (exit)
    console.log('file: testFnc.js ~ line 122 ~ curData', JSON.stringify(curData))
}
init()
