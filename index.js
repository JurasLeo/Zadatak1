const ul = document.querySelector('#user');
const url = 'https://randomuser.me/api/?gender=female&results=10';

const createNode = (element) => { return document.createElement(element); }
const append = (parent, el) => { return parent.appendChild(el); }

//api//

fetch(url)
    .then((response) => {
        return response.json();
    })
    .then( data => {
        console.log(data);
        let user1 = data.results[1];
        
            let li = createNode('li'),
                img = createNode('img'),
                span = createNode('span');
            img.src = user1.picture.medium;
            span.innerHTML = `${user1.name.first} ${user1.name.last} - ${user1.gender}`;
            append(li, img);
            append(li, span);
            append(ul, li);
        
    })
    .catch( error => {
        console.log(error);
    })

// axios //
const url2 = 'https://reqres.in/api/users';
axios.get(url)
    .then(response => {
        const data = response.data;
        console.log(data);
        let user2 = data.results[1];

        let li = createNode('li'),
            img = createNode('img'),
            span = createNode('span');
        img.src = user2.picture.medium;
        span.innerHTML = `${user2.name.first} ${user2.name.last} - ${user2.gender}`;
        append(li, img);
        append(li, span);
        append(ul, li);
    })
    .catch(error => {
        console.log(error);
    });

///

const user3 = document.querySelector('#user3');
async function getData() {
    try {
        const { data } = await axios.get(url2);
        console.log(data);
        user3.innerHTML = `${data.data[0].first_name} ${data.data[0].last_name}`;
    }
    catch (err) {
        console.log(err)
    }
}

getData();

///

///
const url3='https://jsonplaceholder.typicode.com/posts/6';
axios.get(url3)
    .then(response => {
      const users4 = document.getElementById('user4');
      users4.innerHTML = `Title: ${response.data.title}`;
      
      const users5 = document.getElementById('user5');
      users5.innerHTML = `Text: ${response.data.body}`;
    })
    .catch(error => console.error('Error fetching posts:', error));


    async function postData() {
        try {
            const { data } = await axios.post('https://jsonplaceholder.typicode.com/posts'+'',{
                name: 'Leo Juras',
                job: 'Student'
            });
            console.log(data);
        }
        catch (err) {
            console.log(err)
        }
    }
    
    postData();

    async function putData() {
        try {
            const { data } = await axios.put('https://jsonplaceholder.typicode.com/posts/1',{
                name: 'Leo Juras',
                job: 'Student'
            });
            console.log(data);
        }
        catch (err) {
            console.log(err)
        }
    }
    
    putData();



    async function patchData() {
        try {
            const { data } = await axios.patch('https://jsonplaceholder.typicode.com/posts/1', {
                name: 'Leo Juras',
                job: 'Student'
            });
            console.log(data);
        }
        catch (err) {
            console.log(err)
        }
    }
    
    patchData();

    async function deleteData() {
        try {
            const response = await axios.delete('https://jsonplaceholder.typicode.com/posts/1');
            console.log(response);
        }
        catch (err) {
            console.log(err)
        }
    }
    
    deleteData();