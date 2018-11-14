const Employee = require('../models/employees');
const employeeCtrl = {};


employeeCtrl.getEmployees = async (req, res) => {
    const employees = await Employee.find();
    res.json(employees);

};
employeeCtrl.getEmployee = async (req, res) => {
    const employee = await Employee.findById(req.params.id)
    res.json(employee);
};
employeeCtrl.createEmployees = async (req, res) => {
    const employee = new Employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    });
    await employee.save();
    res.json({
        status: 'Empleado guardado'
    })
};
employeeCtrl.editEmployee = async (req, res) => {
    const { id } = req.params;
    const employee = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    };
    console.log(employee);
    await Employee.findByIdAndUpdate(id, { $set: employee }, { new: true });//new true es por si un dato no existe que lo crea
    res.json({ status: 'Empleado actualizado' });
};
employeeCtrl.deleteEmployee = async (req, res) => {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ status: 'Empleado eliminado' });
};


module.exports = employeeCtrl;