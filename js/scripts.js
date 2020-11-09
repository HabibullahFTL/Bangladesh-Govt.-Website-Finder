// UI selectors
let divi = document.querySelector('#division');
let dis = document.querySelector('#district');
let upazila = document.querySelector('#upazila');
let union = document.querySelector('#union');
let selectDivi = document.querySelector('#select_division');
let selectDist = document.querySelector('#select_district');
let selectUpz = document.querySelector('#select_upazila');
let selectUni = document.querySelector('#select_union');
let showDiviWeb = document.querySelector('#showDiviWeb');
let showDistWeb = document.querySelector('#showDistWeb');
let showUpzWeb = document.querySelector('#showUpzWeb');
let showUniWeb = document.querySelector('#showUniWeb');

// Class
class UI{
    static showWeb(type,link,typeId,idName){
        fetch(link)
        .then(res=> res.json())
        .then(typeDetails => {
            typeDetails.forEach(data=>{
                if (typeId == data.id) {
                    document.querySelector(`#${idName}`).innerHTML = `<b>${data.name} ${type}: </b><a href="https://${data.url}/" target="_blanck">${data.url}</a><hr>`;
                }
            })
        })
        
    }
}


// Add Event Listeners
selectDivi.addEventListener('change',selectDistrict);
selectDist.addEventListener('change',selectUpazila);
selectUpz.addEventListener('change',selectUnion);
selectUni.addEventListener('change',showUnionWeb);
document.addEventListener('DOMContentLoaded',()=>{
    // Hiding Dis, Upzila & Union
    dis.style.display = "none";
    upazila.style.display = 'none';
    union.style.display = 'none';

    // Showing Divisions
    fetch('bd_geo/divisions.json')
    .then(res => res.json())
    .then(data=>{
        let option = '<option value="">Select a division</option>';
        data.forEach(division => {
            option += `<option value="${division.id}">${division.name}</option>`
        });
        selectDivi.innerHTML = option;
    })
})

// Functions
// District Data Load
function selectDistrict(){
    // Hiding Dis, Upzila & Union
    dis.style.display = 'block';
    upazila.style.display = 'none';
    union.style.display = 'none';
    
    showDistWeb.innerHTML = '';
    showUpzWeb.innerHTML = '';
    showUniWeb.innerHTML = '';

    // Showing Divisions
    if (selectDivi.value != "") {
        UI.showWeb('Division','bd_geo/divisions.json',selectDivi.value,'showDiviWeb');
        fetch('bd_geo/districts.json')
        .then(res => res.json())
        .then(data=>{
            let option = '<option value="">Select a district</option>';
            data.forEach(district => {
                if (selectDivi.value == district.division_id) {
                    option += `<option value="${district.id}">${district.name}</option>`;
                }
            });
            selectDist.innerHTML = option;
        })
    }else{
        dis.style.display = 'none';
        upazila.style.display = 'none';
        union.style.display = 'none';
        showDiviWeb.innerHTML = '';
        showDistWeb.innerHTML = '';
        showUpzWeb.innerHTML = '';
        showUniWeb.innerHTML = '';
    }
}

// Upozila Data Load
function selectUpazila(){
    // Hiding Dis, Upzila & Union
    dis.style.display = 'block';
    upazila.style.display = 'block';
    union.style.display = 'none';

    showUpzWeb.innerHTML = '';
    showUniWeb.innerHTML = '';

    // Showing Divisions
    if (selectDist.value != "") {
        UI.showWeb('District','bd_geo/districts.json',selectDist.value,"showDistWeb");
        fetch('bd_geo/upazilas.json')
        .then(res => res.json())
        .then(data=>{
            let option = '<option value="">Select a upazila</option>';
            data.forEach(upazila => {
                if (selectDist.value == upazila.district_id) {
                    option += `<option value="${upazila.id}">${upazila.name}</option>`;
                }
            });
            selectUpz.innerHTML = option;
        })
    }else{
        upazila.style.display = 'none';
        union.style.display = 'none';
        showDistWeb.innerHTML = '';
        showUpzWeb.innerHTML = '';
        showUniWeb.innerHTML = '';
    }
}

// Union Data Load
function selectUnion(){
    // Hiding Dis, Upzila & Union
    dis.style.display = 'block';
    upazila.style.display = 'block';
    union.style.display = 'Block';

    showUniWeb.innerHTML = '';
    
    // Showing Divisions
    if (selectUpz.value != "") {
        UI.showWeb('Upazila','bd_geo/upazilas.json',selectUpz.value,"showUpzWeb");
        fetch('bd_geo/unions.json')
        .then(res => res.json())
        .then(data=>{
            let option = '<option value="">Select a union</option>';
            data.forEach(union => {
                if (selectUpz.value == union.upazilla_id) {
                    option += `<option value="${union.id}">${union.name}</option>`;
                }
            });
            selectUni.innerHTML = option;
        })
    }else{
        union.style.display = 'none';
        showUpzWeb.innerHTML = '';
        showUniWeb.innerHTML = '';

    }
}
function showUnionWeb(){
    if (selectUni.value != "") {
        UI.showWeb('Union','bd_geo/unions.json',selectUni.value,"showUniWeb");
    }else{
        showUniWeb.innerHTML = '';
    }
}