class DoctorController {
  async update(req, res) {
    res.json({
      success: true,
      doctor: req.auth,
    });
  }
}
export default new DoctorController();
