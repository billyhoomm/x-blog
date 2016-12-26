<template>
    <div class="nodata animated fadeIn">
        <div class="logo-left-box">
            <h2 class="logo"><span class="blue">奈</span><span class="white">文摩尔</span></h2>
            <h3 class="blue notice">提示!</h3>
            <p class="white">没什么可加载了!</p>
        </div>
        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBkPSJNNDAwLjc2NCA0MDIuMDEybC0xOC4xNC0xMDguNTloLS4wNTNjLTIuNTE3LTE0LjY4NS0xMi42MTItMjkuODktMjkuOC0zNC43MDMtLjIxLS4wNi0uNDIzLS4xMDgtLjY0LS4xNGwtNDIuMzI0LTYuMzVjLS4yNi0uMDQtLjgxMi0uMDYtMS4wNzctLjA2LTIuNjc4IDAtNC45MzYgMS45OTYtNS4yNiA0LjY1NS0yLjI1NSAxOC4yOTgtMTcuMzg0IDMyLjY2NS0zNi44NSAzNi41OTVoLTIxLjI0M2MtMTkuNDctMy45My0zNC42LTE4LjI5NC0zNi44NDctMzYuNTk0LS4zMzMtMi43MzYtMi43OTctNC43OTQtNS4zOTctNC42NTItLjMxLS4wMTgtLjYxNi4wMDgtLjk0Mi4wNTdsLTQyLjMyIDYuMzUzYy0uMjE4LjAzLS40My4wNzgtLjY0My4xMzctMTcuMTg4IDQuODEtMjcuMjgzIDIwLjAxOC0yOS44IDM0LjdoLS4wNTRsLTE4LjE0IDEwOC41OTJDMTA3LjQ4IDQyMS43MzIgMTIyLjU5NyA0NDAgMTQyLjY3IDQ0MGgyMjYuNjZjMjAuMDczIDAgMzUuMTktMTguMjcgMzEuNDM0LTM3Ljk4OHoiIGZpbGw9IiNGRjRGMTkiLz48cGF0aCBkPSJNMjU2IDI0Ni44N2MtMTguNTIgMC0zNS4zMjItNy45NDctNDcuNzItMjAuNzktLjAwOCA3LjY5Ny0uMjg4IDE4LjgwNy0yLjMzIDI2LjkxNCAxLjM0LjgxOCAyLjM4IDIuMTYyIDIuNTggMy44MzMgMi42NDcgMjEuNTMgMjMuMDUyIDM3Ljc2IDQ3LjQ3IDM3Ljc2IDI0LjQxMyAwIDQ0LjgxOC0xNi4yMzQgNDcuNDctMzcuNzYuMjA1LTEuNjc0IDEuMjItMy4wMTUgMi41OC0zLjgzLTIuMDQtOC4xMDgtMi4zMjItMTkuMjItMi4zMy0yNi45MTgtMTIuMzk4IDEyLjg0Mi0yOS4yIDIwLjc5LTQ3LjcyIDIwLjc5eiIgZmlsbD0iI0ZEQzg4RSIvPjxwYXRoIGQ9Ik0zMDIuNjg0IDIyNy4wNTZDMjkwLjM5IDIzOS4zIDI3NC4wMjQgMjQ2Ljg3IDI1NiAyNDYuODdjLTE4LjUyIDAtMzUuMzIyLTcuOTQ3LTQ3LjcyLTIwLjc5LS4wMDggNy42OTctLjI4OCAxOC44MDctMi4zMyAyNi45MTQgMS4zNC44MTggMi4zOCAyLjE2MiAyLjU4IDMuODMzIDEuMTcgOS41MTYgNS44MTggMTcuOTkgMTIuNzQgMjQuNDkgMzEuOTI0LTQuNDk1IDY4LjE1Ni0zNi4wMTcgODEuNDE0LTU0LjI2eiIgZmlsbD0iI0ZGQjk4MCIvPjxwYXRoIGQ9Ik0zMDMuNzE3IDExNC4zMmgtOTAuMTMzYy0xNC42MTcgMC0yNi41MSAxMS44OTQtMjYuNTEgMjYuNTF2MzEuODEzYzAgNDAuOTMgMzAuOTIgNzQuMjI3IDY4LjkyNSA3NC4yMjdzNjguOTIzLTMzLjI5OCA2OC45MjMtNzQuMjI3VjEzNS41M2MwLTExLjY5NS05LjUxLTIxLjIxLTIxLjIwNy0yMS4yMXoiIGZpbGw9IiNGRkUxQjIiLz48cGF0aCBkPSJNMjkzLjExMyA1NmgtNjguOTI1Yy05Ljk3MiAwLTE4LjM1NSA2LjkxNy0yMC42MTIgMTYuMjA0LTE4LjI1IDIuMzItMzIuNDA3IDE3Ljk0Ni0zMi40MDcgMzYuODE2djI2LjUxYzAgMTMuNjY0IDUuOCAyNi40MSAxNS45MDQgMzUuNDd2LTMwLjE2OGMwLTE0LjYxNyAxMS44OTMtMjYuNTEgMjYuNTEtMjYuNTFoOTAuMTMzYzExLjY5NiAwIDIxLjIwOCA5LjUxNCAyMS4yMDggMjEuMjA4djM1LjQ2NGMxMC4xMDctOS4wNTcgMTUuOTA2LTIxLjgwNCAxNS45MDYtMzUuNDY0di0zMS44MTJjMC0yNi4zMS0yMS40MDUtNDcuNzE4LTQ3LjcyLTQ3LjcxOHoiIGZpbGw9IiM3RTU0NDkiLz48cGF0aCBkPSJNMzUyIDQ0MEgxNjBjLTQuNDE4IDAtOC0zLjU4Mi04LThWMzI4YzAtNC40MTggMy41ODItOCA4LThoMTkyYzQuNDE4IDAgOCAzLjU4MiA4IDh2MTA0YzAgNC40MTgtMy41ODIgOC04IDh6IiBmaWxsPSIjRDhEQ0UxIi8+PHBhdGggZD0iTTUwNCA0NTZIOGMtNC40MjIgMC04LTMuNTgyLTgtOHMzLjU3OC04IDgtOGg0OTZjNC40MjIgMCA4IDMuNTgyIDggOHMtMy41NzggOC04IDh6IiBmaWxsPSIjOUY2NDU5Ii8+PGNpcmNsZSBjeD0iMjU2IiBjeT0iMzg0IiByPSIxNiIgZmlsbD0iI0ZGRiIvPjwvc3ZnPg==" alt="当前没有数据诶">
    </div>
</template>
<style lang="scss">
    @import "../theme/theme.scss";
    .nodata {
        max-width:780px;
        width:100%;
        padding: 20px;
        margin:0 auto;
        @include display-flex;
        @include justify-content(flex-end);
        @include align-items(center);
        @include flex-direction(column);
        height: 312px;
        background: rgba(0, 0, 0, 0.4);
        border-radius: 5px;
        margin-bottom: 30px;
        margin-top: 30px;
        position: relative;
        .logo-left-box {
            position: absolute;
            left: 25px;
            top: 25px;
            color: #fff;
            .logo{
                margin-bottom:5px;
            }
            .notice {
                margin-top: 5px;
                margin-bottom: 10px;
                position: relative;
                &::after {
                    content: '';
                    height: 3px;
                    width: 30px;
                    position: absolute;
                    background: $base-theme-color;
                    left: 0;
                    bottom: -6px;
                }
            }
            .blue {
                color: $base-theme-color;
            }
            .white {
                color: #fff;
            }
        }
        img {
            width: 200px;
            height: 200px;
        }
        &::after{
            content: '';
            position: absolute;
            right: 0;
            bottom: 0;
            width: 10px;
            height: 70px;
            background:$base-theme-color;
            border-bottom-right-radius: 5px;
        }
    }

</style>
