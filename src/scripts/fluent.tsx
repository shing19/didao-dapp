export const provider = {
    request: () => {
        window.conflux
            .request({
                method: "cfx_requestAccounts"
            })
            .then(() => {
                console.log("fluent登录")
            })
    },
    exit: () => {
        window.conflux
            .request({
                method: "cfx_disconnect",
            })
            .then(() => {
                console.log("授权已取消")
                window.confirm("授权已取消")
            })
            .catch((e) => {
                console.error("调用失败", e)
            })
    },
    import: () => {
        window.conflux.request({
            method: 'anyweb_importAccount',
            params: [{
                address: ['cfxtest:aansrpkadmxudwcshw9g18yvutrtd070zppdj3jmgn', 'cfxtest:aajv0k8zaedhhrzmv7e5mn2bax6r65y2way603xabd'],
                addressName: ['Acc1', 'Acc2'],
            }],
        }).then((result) => {
            console.log('导入的地址列表', result)
            window.confirm('导入的地址列表', result)
        }).catch((e) => {
            console.error('调用失败', e)
        })
    },
    state: () => {
        window.conflux.request({
            method: 'anyweb_loginstate'
        }).then((result) => {
            console.log('登录状态', result)
            window.confirm(`登录状态: ${result}`)
        }).catch((err) => {
            console.error('调用失败', e)
        })
    },
    call: (account) => {
        console.log('登录地址：', account)
        window.conflux
        .request({
            method: 'cfx_call',
            params: [{
                from: account,
                to: "cfxtest:acgwnjmd623nvmz7s5a9bwn2kfy4mmujtu06k8zv6c"
            }]
        })
        return account
    }
}