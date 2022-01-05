import moment from "moment";

class Helper {
  formatDateTime(n) {
    return moment(n, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm");
  }
  formatDate(n) {
    return moment(n, "YYYY-MM-DD").format("DD/MM/YYYY");
  }
}

export default new Helper();
