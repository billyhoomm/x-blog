module.exports = {
    install: function (Vue, options) {


        const defaultOptions = {
            maxToasts: options.maxToasts || 6,
            position: options.position || 'left bottom',
            theme: options.theme || 'default', // info warning error success
            timeLife: options.timeLife || 5000,
            closeBtn: options.closeBtn || false,
        };


        // let toast = function () {
        //     return {
        //         // Public
        //         show: function (message, options) {
        //             this._addToast(message, options)
        //             this._moveToast()
        //
        //             return this
        //         },
        //
        //         // Private
        //         _addToast(message, options = {}) {
        //             if (!message) {
        //                 return
        //             }
        //
        //             options.directionOfJumping = this.directionOfJumping
        //
        //             this.toasts.unshift({
        //                 message,
        //                 options,
        //                 isDestroyed: false
        //             })
        //         },
        //         _moveToast(toast) {
        //             const maxToasts = this.options.maxToasts > 0
        //                 ? this.options.maxToasts
        //                 : 9999
        //
        //             // moving||removing old toasts
        //             this.toasts = this.toasts.reduceRight((prev, toast, i) => {
        //                 if (toast.isDestroyed) {
        //                     return prev
        //                 }
        //
        //                 if (i + 1 >= maxToasts) {
        //                     return prev
        //                 }
        //
        //                 return [toast].concat(prev)
        //             }, [])
        //         },
        //         _updateClassesOfPosition(position) {
        //             return position.split(' ').reduce((prev, val) => {
        //                 prev[`--${val.toLowerCase()}`] = true
        //
        //                 return prev
        //             }, {})
        //         },
        //         _updateDirectionOfJumping(position) {
        //             return position.match(/top/i) ? '+' : '-'
        //         }
        //
        //     }
        // }


        let toast = {
            show: function () {
                console.log("show")
                console.log(options)
                console.log("------")
            }
        }


        Vue.$toast = toast;
        Object.defineProperties(Vue.prototype, {
            $toast: {
                get: function () {
                    return toast;
                }
            },
        });

    }
}


