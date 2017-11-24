/**
 * Created by Hsiang on 2016/11/5.
 * 缓存设计
 */

function Cache() {
	/**
	 * deep copy
	 * @param obj/array/others
	 * */
	function _deepClone(obj) {
		if (Array.isArray(obj)) {
			return obj.map(_deepClone)
		} else if (obj && typeof obj === 'object') {
			let cloned = {}
			let keys = Object.keys(obj)
			for (let i = 0, l = keys.length; i < l; i++) {
				let key = keys[i]
				cloned[key] = _deepClone(obj[key])
			}
			return cloned
		} else {
			return obj
		}
	}

	/**
	 * cache生成工厂
	 * */
	function _cacheFactory() {
		let _data = {};

		console.log('***********NOTICE*************');
		console.log('Cache Object inited at:' + new Date().getTime());
		console.log('******************************');

		/**
		 * 判断是否有数据，同时判断数据是否过期，如果过期则删除
		 * @param  key require 查找的key
		 * @return boolean
		 * */
		function _hasData(key) {
			if (!!_data[key]) {
				let _obj = _data[key];
				let _timeNow = parseInt(new Date().getTime());
				if (_timeNow > _obj.time && (_obj.time + _obj.expire > _timeNow)) {
					// 未过期
					// console.log('-->数据：' + key + '使用缓存！');
					// console.log('-->数据：' + key + '还有' + (_obj.time + _obj.expire - _timeNow)/1000 + 's过期！');
					return _data[key].value
				} else {
					// 移除过期的数据
					_removeData(key);
					return false
				}
			} else {
				return false
			}
		}

		/**
		 * 获取key对应的数据，只是返回结果，过期时间及存数时间不返回
		 * @param key require 查找的key
		 * @return boolean _data[key]
		 * */
		function _getData(key) {
			if (_hasData(key)) {
				// console.log('-->数据：' + key + '使用缓存！');
				return _data[key].value
			} else {
				return false
			}
		}

		/**
		 * 获取全部数据，使用_hasDate()遍历剔除过过期元素，之后返回剩余的_data结果
		 * @return object _data
		 * */
		function _getAllData() {
			for (let index in _data) {
				_hasData(index);
			}
			return _data
		}

		/**
		 * 保存键值对，并设置过期时间
		 * @param key require 设置的键值
		 * @param value require
		 * @param expire option 过期时间，单位ms,默认1min
		 * */
		function _setData(key, value, expire = 60 * 1000) {
			_data[key] = {
				'value': _deepClone(value),
				'expire': parseInt(expire),
				'time': parseInt(new Date().getTime()),
				'date': new Date(),
			};
			// console.log('-->键值对' + key + ':'+ JSON.stringify(_data[key]) + '设置成功')
			return true
		}

		/**
		 * 手动删除某一个键值对
		 * @param key require 删除的键值
		 * @return boolean
		 * */
		function _removeData(key) {
			return delete _data[key]
		}

		return {
			has: _hasData,
			get: _getData,
			getAll: _getAllData,
			set: _setData,
			remove: _removeData,
		}
	}

	/**
	 * 挂载到全局,保持单例对象
	 * */
	let cache;
	if (!global.cache) {
		global.cache = cache = new _cacheFactory();
	} else {
		cache = global.cache;
	}

	return cache;
}

module.exports = Cache();
