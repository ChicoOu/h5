// c2
// img
var c2 = (function () {
    function Course() {
        var _id;
        var _name;

        function setId(id) {
            _id = id;
        }

        function setName(name) {
            _name = name;
        }

        function getId() {
            return _id;
        }

        function getName() {
            return _name;
        }

        function toString() {
            return _id + '\t' + _name;
        }

        return {
            setId: setId,
            setName: setName,
            getId: getId,
            getName: getName,
            toString: toString
        }
    }

    function CourseList() {
        var _courses = [];

        function add(course) {
            // 1) course可能是空
            if (course === null) {
                console.log('空课程不能添加！');
                return;
            }
            // 2) 重复添加课程
            for (let i = 0; i < _courses.length; i++) {
                if (_courses[i].getId() === course.getId()) {
                    console.log('不能重复添加课程!');
                    return;
                }
            }
            // 3) id号或者name是空值
            _courses.push(course);
        }

        function addCourse(id, name) {
            let course = new Course();
            course.setName(name);
            course.setId(id);

            add(course);
        }

        function remove(id) {
            for (let i = 0; i < _courses.length; i++) {
                if (_courses[i].getId() === id) {
                    _courses.splice(i, 1);
                    return;
                }
            }

            console.log('未能找到该课程:' + id);
        }

        function getAll() {
            return _courses;
        }

        function getById(id) {
            for (let course of _courses) {
                if (course.getId() === id) {
                    return course;
                }
            }
            return null;
        }

        function getByName(name) {
            let result = [];
            for (let course of _courses) {
                if (course.getName().indexOf(name) >= 0) {
                    result.push(course);
                }
            }
            return result;
        }

        function toString() {
            let str = '';
            for (let i = 0; i < _courses.length; i++) {
                str += _courses[i].toString();
                str += '\n';
            }
            return str;
        }

        function update(id, name) {
            for (let course of _courses) {
                if (course.getId() === id) {
                    course.setName(name);
                }
            }
        }

        return {
            add: add,
            addCourse: addCourse,
            remove: remove,
            getAll: getAll,
            getById: getById,
            getByName: getByName,
            toString: toString,
            update: update
        }
    }

    function CourseService() {
        var _coursesData = [
            { id: '0001', name: 'RFID开发' },
            { id: '0002', name: 'WSN开发' },
            { id: '0003', name: 'WSN实训' },
            { id: '0004', name: 'Web前端开发' }
        ];

        function load(succCallback, failCallback) {
            const xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState === 4) {
                    if (xmlhttp.status === 304 || (xmlhttp.status >= 200 && xmlhttp.status < 300)) {
                        console.log('type: success, result: ', xmlhttp.responseText);
                        succCallback(JSON.parse(xmlhttp.responseText));
                    } else {
                        console.log('type: error, errCode:', xmlhttp.status)
                        failCallback(xmlhttp.status);
                    }
                }
            };
            xmlhttp.open('get', '/courses', true);
            xmlhttp.send();
        }

        return {
            load: load,
            data: _coursesData
        }
    }

    function testCourse() {
        var course1 = new Course();
        course1.setId('0001');
        course1.setName('Web前端开发');

        console.log(course1.toString());

        var course2 = new Course();
        course2.setId('0002');
        course2.setName('WSN开发');

        console.log(course2.toString());

        var course3 = new Course();
        course3.setId('0003');
        course3.setName('RFID');

        console.log(course3.toString());
    }

    //console.log('测试单课程****');
    //testCourse();

    function testCourseList() {
        var courseList = new CourseList();
        var course1 = new Course();
        course1.setId('0001');
        course1.setName('Web前端开发');
        courseList.add(course1);

        var course2 = new Course();
        course2.setId('0002');
        course2.setName('WSN开发');
        courseList.add(course2);

        var course3 = new Course();
        course3.setId('0003');
        course3.setName('RFID');
        courseList.add(course3);

        var course4 = new Course();
        course4.setId('0004');
        course4.setName('WSN实训');
        courseList.add(course4);
        console.log(courseList.toString());

        console.log('getById 0002');
        console.log(courseList.getById('0002').toString());
        console.log(courseList.getById('0005'));

        console.log('测试getByName');
        let r = courseList.getByName('WSN');
        for (let item of r) {
            console.log(item.toString());
        }
    }

    //console.log('测试课程列表****');
    //testCourseList();

    function Student() {
        var _id;
        var _name;
        var _gender;

        function setId(id) {
            _id = id;
        }

        function setName(name) {
            _name = name;
        }

        function setGender(gender) {
            _gender = gender;
        }

        function getId() {
            return _id;
        }

        function getName() {
            return _name;
        }

        function getGender() {
            return _gender;
        }

        function toString() {
            return _id + '\t' + _name + '\t' + (_gender === 0 ? '男' : '女');
        }

        return {
            setId: setId,
            setName: setName,
            setGender: setGender,
            getId: getId,
            getName: getName,
            getGender: getGender,
            toString: toString
        }
    }

    function StudentList() {
        var _students = [];

        function add(student) {
            // 1) student可能为空
            if (student === null) {
                console.log('空学生不能添加！');
                return;
            }
            // 2) 重复添加学生
            for (let i = 0; i < _students.length; i++) {
                if (_students[i].getId() === student.getId()) {
                    console.log('不能重复添加学生!');
                    return;
                }
            }
            // 3) id号或者name是空值
            _students.push(student);
        }

        function addStudent(id, name, gender) {
            let student = new Student();
            student.setName(name);
            student.setId(id);
            student.setGender(gender);

            add(student);
        }

        function remove(id) {
            for (let i = 0; i < _students.length; i++) {
                if (_students[i].getId() === id) {
                    _students.splice(i, 1);
                    return;
                }
            }

            console.log('未能找到该学生:' + id);
        }

        function getAll() {
            return _students;
        }

        function getById(id) {
            for (let student of _students) {
                if (student.getId() === id) {
                    return student;
                }
            }
            return null;
        }

        function getByName(name) {
            let result = [];
            for (let student of _students) {
                if (student.getName().indexOf(name) >= 0) {
                    result.push(student);
                }
            }
            return result;
        }

        function toString() {
            let str = '';
            for (let i = 0; i < _students.length; i++) {
                str += _students[i].toString();
                str += '\n';
            }
            return str;
        }

        function update(id, name, gender) {
            for (let student of _students) {
                if (student.getId() === id) {
                    student.setName(name);
                    student.setGender(gender);
                }
            }
        }

        return {
            add: add,
            addStudent: addStudent,
            remove: remove,
            getAll: getAll,
            getById: getById,
            getByName: getByName,
            toString: toString,
            update: update
        }
    }

    function StudentService() {
        var _studentsData = [
            { id: '0001', name: '张三', gender: 0 },
            { id: '0002', name: '李四', gender: 1 },
            { id: '0003', name: '王五', gender: 0 },
            { id: '0004', name: '赵六', gender: 1 }
        ];

        function load(succCallback, failCallback) {
            const xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState === 4) {
                    if (xmlhttp.status === 304 || (xmlhttp.status >= 200 && xmlhttp.status < 300)) {
                        console.log('type: success, result: ', xmlhttp.responseText);
                        succCallback(JSON.parse(xmlhttp.responseText));
                    } else {
                        console.log('type: error, errCode:', xmlhttp.status)
                        failCallback(xmlhttp.status);
                    }
                }
            };
            xmlhttp.open('get', '/students', true);
            xmlhttp.send();
        }

        return {
            load: load,
            data: _studentsData
        }
    }

    function Performance(student, values) {
        var _student;
        var _values = [];

        _student = student;
        if (values && typeof (values) !== 'undefined') {
            _values = values;
        }

        return {
            student: _student,
            values: _values
        }
    }

    function PerformanceList(courseList) {
        var _performances = [];
        var _courseList = courseList;

        function add(performance) {
            // 1) 成绩可能为空
            if (performance === null) {
                console.log('空成绩不能添加！');
                return;
            }
            // 2) 重复添加成绩
            for (let i = 0; i < _performances.length; i++) {
                if (_performances[i].student.getId() === performance.student.getId()) {
                    console.log('不能重复添加学生成绩!');
                    return;
                }
            }
            // 3) id号或者name是空值
            _performances.push(performance);
        }

        function addPerformance(student, values) {
            let performance = new Performance(student, values);

            add(performance);
        }

        function remove(id) {
            for (let i = 0; i < _performances.length; i++) {
                if (_performances[i].student.getId() === id) {
                    _performances.splice(i, 1);
                    return;
                }
            }

            console.log('未能找到该学生:' + id);
        }

        function getAll() {
            return _performances;
        }

        function getById(id) {
            for (let performance of _performances) {
                if (performance.student.getId() === id) {
                    return performance;
                }
            }
            return null;
        }

        function getByName(name) {
            let result = [];
            for (let performance of _performances) {
                if (performance.student.getName().indexOf(name) >= 0) {
                    result.push(performance);
                }
            }
            return result;
        }

        function toString() {
            let str = _courseList.toString();
            for (let i = 0; i < _performances.length; i++) {
                str += _performances[i].student.toString();
                str += _performances[i].values;
                str += '\n';
            }
            return str;
        }

        function update(id, values) {
            for (let performance of _performances) {
                if (performance.student.getId() === id) {
                    performance.values = values;
                }
            }
        }

        return {
            add: add,
            addPerformance: addPerformance,
            remove: remove,
            getAll: getAll,
            getById: getById,
            getByName: getByName,
            toString: toString,
            update: update,
            courseList: _courseList
        }
    }

    return {
        Course: Course,
        CourseList: CourseList,
        CourseService: CourseService,
        Student: Student,
        StudentList: StudentList,
        StudentService: StudentService,
        Performance: Performance,
        PerformanceList: PerformanceList
    }
}());
