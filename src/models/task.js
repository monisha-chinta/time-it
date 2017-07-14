class Task {

  constructor(id, taskName, taskType, fromTime, toTime) {
    this.id = id;
    this.taskName = taskName;
    this.taskType = taskType;
    this.fromTime = fromTime;
    this.toTime = toTime;
  }

  get value() {
    return {
      id: this.id,
      taskName: this.taskName,
      taskType: this.taskType,
      fromTime: this.fromTime,
      toTime: this.toTime
    }
  }
}

export default Task;
