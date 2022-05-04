
import { InfluxDB } from "@influxdata/influxdb-client"

class InfluxDBClient {
  private token: string
  private INFLUXDB_URL: string
  private client: any | null = null

  public constructor() {
    this.token = process.env.INFLUXDB_TOKEN!
    this.INFLUXDB_URL = process.env.INFLUXDB_URL!
    this.client = this.connect()
  }

  public getInstance () {
    return this.client
  }

  private connect () {
    return new InfluxDB({ url: this.INFLUXDB_URL, token: this.token })
  }
}

const influxDB: InfluxDBClient = new InfluxDBClient();
Object.freeze(influxDB)
export default influxDB