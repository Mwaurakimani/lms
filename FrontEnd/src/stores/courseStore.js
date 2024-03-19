import {defineStore} from "pinia";
import {useServer} from "@/composables/server.js";
import {useRouter} from "vue-router";
export const useCourseStore = defineStore('useCourseStore', {
    state: () => ({
        courses: {
            active: null,
            list:null
        }
    }),

    actions:{
        loadActiveCourse(data){
            this.courses.active = data;
        },
        saveActiveCurse(){
            let formData = new FormData()
            let course = this.courses.active
            const server = useServer()


            for (const key in course) {
                if (course.hasOwnProperty(key) && course[key] !== null) {
                    if (key === 'modules') {
                        formData.append(key, JSON.stringify(course.modules));
                        continue;
                    }
                    formData.append(key, course[key]);
                }
            }

            console.log("hi")

            server.post('/api/createCourse', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err.data)
                })
        }
    }
})