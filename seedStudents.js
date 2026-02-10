// seedStudents.js
const mongoose = require('mongoose');

// ------------------ MongoDB Connection ------------------
mongoose.connect('mongodb+srv://Biswajit:Biswajit%234321@cluster0.pynvqbg.mongodb.net/collegeDB?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB connected successfully');
    seedStudents();
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});

// ------------------ Schema Definition ------------------
const studentSchema = new mongoose.Schema({
    studentId: String,
    name: String,
    branch: String,
    subjects: [String]
});

const Student = mongoose.model('Student', studentSchema);

// ------------------ Students Data ------------------
const students = [
    { studentId: "230301130001", name: "ADYASHA SAHOO", branch: "ECE", subjects: ["RTOS","LINUX","MBESD","PROJECT","EMFT","SKIL"] },
    { studentId: "230301130002", name: "SATYABRATA SAHOO", branch: "ECE", subjects: ["RTOS","LINUX","MBESD","PROJECT","EMFT","SKIL"] },
    { studentId: "230301130003", name: "Biswajit pattanaik", branch: "ECE", subjects: ["RTOS","LINUX","MBESD","PROJECT","EMFT","SKIL"] },
    { studentId: "230301130004", name: "ASHISH KUMAR", branch: "ECE", subjects: ["RTOS","LINUX","MBESD","PROJECT","EMFT","SKIL"] },
    { studentId: "230301130005", name: "SUBHAM NARAYANA MARTHA", branch: "ECE", subjects: ["RTOS","LINUX","MBESD","PROJECT","EMFT","SKIL"] },
    { studentId: "230301130006", name: "PRIYANSU PRITAM KHATEI", branch: "ECE", subjects: ["RTOS","LINUX","MBESD","PROJECT","EMFT","SKIL"] },
    { studentId: "230301130007", name: "AJOY KUMAR TIWARI", branch: "ECE", subjects: ["RTOS","LINUX","MBESD","PROJECT","EMFT","SKIL"] },
    { studentId: "230301130008", name: "MAUSAM MOHANTA", branch: "ECE", subjects: ["RTOS","LINUX","MBESD","PROJECT","EMFT","SKIL"] },
    { studentId: "230301130009", name: "ITIMAYEE MOHAPATRA", branch: "ECE", subjects: ["RTOS","LINUX","MBESD","PROJECT","EMFT","SKIL"] },
    { studentId: "230301130010", name: "RUDRA NARAYAN MOHARANA", branch: "ECE", subjects: ["RTOS","LINUX","MBESD","PROJECT","EMFT","SKIL"] },
    { studentId: "230301130011", name: "PRACHI PRIYADARSINI KAR", branch: "ECE", subjects: ["RTOS","LINUX","MBESD","PROJECT","EMFT","SKIL"] },
    { studentId: "230301130012", name: "ASHRIBAD SARANGI", branch: "ECE", subjects: ["RTOS","LINUX","MBESD","PROJECT","EMFT","SKIL"] },
    { studentId: "230301130013", name: "ISEETA SAUMYADARSHINI", branch: "ECE", subjects: ["RTOS","LINUX","MBESD","PROJECT","EMFT","SKIL"] },
    { studentId: "230301130014", name: "DEVENDRAN MUDLIER", branch: "ECE", subjects: ["RTOS","LINUX","MBESD","PROJECT","EMFT","SKIL"] },
    { studentId: "230301130015", name: "VAIBHAV KUMAR PATRO", branch: "ECE", subjects: ["RTOS","LINUX","MBESD","PROJECT","EMFT","SKIL"] },
    { studentId: "230301130016", name: "DEEPTI MAYEE PANDA", branch: "ECE", subjects: ["RTOS","LINUX","MBESD","PROJECT","EMFT","SKIL"] },
    { studentId: "230301130017", name: "BHABANI SANKAR DASH", branch: "ECE", subjects: ["RTOS","LINUX","MBESD","PROJECT","EMFT","SKIL"] },
    { studentId: "230301130018", name: "SUBHASHREE SAHOO", branch: "ECE", subjects: ["RTOS","LINUX","MBESD","PROJECT","EMFT","SKIL"] },
    { studentId: "230301130019", name: "KAIBALYA MOHANTY", branch: "ECE", subjects: ["RTOS","LINUX","MBESD","PROJECT","EMFT","SKIL"] },
    { studentId: "230301130020", name: "ROHIT JAMBHULKAR", branch: "ECE", subjects: ["RTOS","LINUX","MBESD","PROJECT","EMFT","SKIL"] },
    { studentId: "230301130021", name: "SOUMYA RANJAN DASH", branch: "ECE", subjects: ["RTOS","LINUX","MBESD","PROJECT","EMFT","SKIL"] },
    { studentId: "230301130022", name: "BISWAJIT PATRA", branch: "ECE", subjects: ["RTOS","LINUX","MBESD","PROJECT","EMFT","SKIL"] },
    { studentId: "230301130023", name: "BIKASH KUMAR SWAIN", branch: "ECE", subjects: ["RTOS","LINUX","MBESD","PROJECT","EMFT","SKIL"] },
    { studentId: "230301130024", name: "SUBHRANSU PATRA", branch: "ECE", subjects: ["RTOS","LINUX","MBESD","PROJECT","EMFT","SKIL"] },
    { studentId: "230301130025", name: "E RUDRA NARAYANA PATRO", branch: "ECE", subjects: ["RTOS","LINUX","MBESD","PROJECT","EMFT","SKIL"] },
    { studentId: "230301130026", name: "HITESH RAJ GARADA", branch: "ECE", subjects: ["RTOS","LINUX","MBESD","PROJECT","EMFT","SKIL"] },
    { studentId: "230301130027", name: "BISHNU PRASAD DEBATA", branch: "ECE", subjects: ["RTOS","LINUX","MBESD","PROJECT","EMFT","SKIL"] },
    { studentId: "230301130028", name: "SHYAMANT KUMAR RAJ", branch: "ECE", subjects: ["RTOS","LINUX","MBESD","PROJECT","EMFT","SKIL"] },
    { studentId: "230301130029", name: "PRINCE KUSHWAHA", branch: "ECE", subjects: ["RTOS","LINUX","MBESD","PROJECT","EMFT","SKIL"] },
    { studentId: "230301130030", name: "PUJA MOHANTY", branch: "ECE", subjects: ["RTOS","LINUX","MBESD","PROJECT","EMFT","SKIL"] }
];

// ------------------ Seed Function ------------------
async function seedStudents() {
    try {
        await Student.deleteMany();
        await Student.insertMany(students);
        console.log("Students added successfully!");
    } catch (err) {
        console.error("Error adding students:", err);
    } finally {
        mongoose.connection.close();
    }
}
