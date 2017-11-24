### install


### init



### 结构设计




### API

#### $default(item)  
item:object

```
Vue.$localStorage.$default({
    'key1':{
        'key1_1':'value1_1',
        'key1_2':'value1_2',
    },
    'key2':{
        'key2_1':'value2_1',
        'key2_2':'value2_2',
    }
})

```

storage

|      key      |       value   |
| ------------- | --------------- |
|    vStorage-key1    |       {"key1_1":"value1_1","key1_2":"value1_2"}     |  
|    vStorage-key2    |      {"key2_1":"value2_1","key2_2":"value2_2"}     |  

细节


#### $reset(item)

```
将带有指定前缀的key都清除
Vue.$localStorage.$reset()
将带有指定前缀的key都清除，之后初始化括号内的数据，
Vue.$localStorage.$reset({
	'key1':{
        'key1_1':'value1_1',
        'key1_2':'value1_2',
    }
})

```

storage

|      key      |       value   |
| ------------- | --------------- |
|    vStorage-key1    |       {"key1_1":"value1_1","key1_2":"value1_2"}     |   


如果项目中有些数据是不希望清除的，请已'$'开头命名变量key值，例如下面的键值对，$reset是不会处理的。但是也意味着此键值对将为内置键值对，不会同步到本地web storage中。

```
Vue.$localStorage.$reset({
	'$key1':{
        'key1_1':'value1_1',
        'key1_2':'value1_2',
    }
})
```

#### $fetch()

将本地web storage中的数据拉取到storage中。



#### $sync()

数据双向同步


#### $set()

存数据操作
如果使用

#### $delete(key)

数据删除，双向同步
推荐将删除属性的value置空


```
Vue.$localStorage.key="value"
```

的方式，则能将数据存入storage服务中，但是不会与本地storage同步，需要手动$sync()。

但是使用此方法，就可保持同步


两种使用方法：

1. 传对象批量设置
2. 单独设置

```
Vue.$localStorage.$set({
	'$key1':{
        'key1_1':'value1_1',
        'key1_2':'value1_2',
    }
})


Vue.$localStorage.$set('key1',{
    'key1_1':'value1_1',
    'key1_2':'value1_2',
})



```








## QA

Q: $localStorage是单例对象吗？    
A: 是的，每次调用都返回同一个，且可以在不同的组件中使用，$localStorage只是挂载到Vue上面的一个对象。

Q: 每次访问$localStorage都会操作本地web storage吗？    
A: 取值和设置都只是对$localStorage对象进行操作，本地web storage只是起到备份的作用。故整体性能会好一些


