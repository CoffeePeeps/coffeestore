import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Coffee = ({ coffee }) =>{
    if(!coffee.id){
        return '...loading coffee';
    }
    return(
        <div>
            <header>
                <h1> COFFEE </h1>
                <h2>{ coffee.name } </h2>
                <hr />
            </header>
            <main>
                <h4>Details</h4>
                {student.email && `email: ${student.email}` }
                <br />
                {student.gpa && `gpa: ${student.gpa}` }
                {/* { student.email } ---- { student.gpa } */}
                <p>{student.school && 'Attends: ' }
                {student.school ? <Link to ={`/schools/${student.school.id}`}>{student.school.name}</Link>: 'Not enrolled in a school' }</p>
                <br />
                <button onClick={()=>destroy(student)}>Delete Student</button>
                <br />
                <p><Link to={`/students/${student.id}/update`}>Update Student</Link></p>
            </main>
        </div>

        )
}

export default connect(
    (state, otherProps)=> {
        //console.log(otherProps)
        const student = state.students.find(student => student.id === otherProps.match.params.id * 1) || {};
        return {
            student
            };
        },
        (dispatch, { history })=> {
            return {
                destroy: (student)=> {
                    //console.log(student);
                    dispatch(destroyStudent(student, history));
                }
              
            };
        }
    )(Student);
    