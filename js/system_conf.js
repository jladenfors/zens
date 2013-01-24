function SystemConf() {
    
    this.props = {
        electric_db : 'electric',
        temperature_db : 'temperature',
        electric_sensor_id1 : 'el1',
        temperature_sensor_id1 : 't1',
        m_schema : 'zens',
        m_url : '127.0.0.1',
        m_port : 27017,
        sensor_poll : 60000
    }
    
    this.getData = function (key){        
        return props[key];
    }


    this.safeTrim = function(data){
        if (data){
            return data.trim();
        }else {
            return data;
        }
    }


    return {
        eldb: this.getData('electric_db'),
        tempdb: this.getData('temperature_db'),
        e1_sensor: this.getData('electric_sensor_id'),
        t1_sensor: this.getData('temperature_sensor_id1'),
        mongo_schema : this.getData('m_schema'),
        mongo_url : this.getData('m_url'),
        sensor_poll : this.getData('sensor_poll'),
        mongo_port: this.getData('m_port'),
        safeTrim : this.safeTrim
    }   
}

exports.SystemConf = SystemConf();