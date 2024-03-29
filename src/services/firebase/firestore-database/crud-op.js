import {getFirestore, collection, getDocs, addDoc, setDoc, deleteDoc, updateDoc, doc, getDoc, orderBy, limit, query, where,  getCountFromServer} from "firebase/firestore"
import "../conf-firebase"
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';

const db = getFirestore()
export const store_doc =  async function (obj, collection_name, error= ()=>{}, postprocessing = ()=>{}) {
    try {
        // preprocessing
        if( typeof(obj) == "function"){
            obj = obj()
        }

        // execute operation
        let col= collection(db, collection_name)
        let result = await addDoc(col, obj)
        console.log(result)

        // postprocessing
        console.log("ok")
        postprocessing()

    }
    catch (e) {
        console.log(e)
        console.log("erroreeee")
        error()
    }
}

export const store_doc_by_id = async function (obj, collection_name, id, error= ()=>{}, postprocessing = ()=>{}) {
    try{
        // preprocessing
        if( typeof(obj) == "function"){
            obj = obj()
        }
        if( typeof(id) == "function"){
            id = id()
        }

        // execute operation
        let result = await setDoc(doc(db, "Review", id), obj)

        // postprocessing
        console.log("ok")
        postprocessing()

        }
    catch (e) {
        console.log(e)
        error()
    }
}

export const load_docs = async function (collection_name, id, postprocessing, error = ()=>{}, do_not_exist = ()=>{}){
    try{
        // preprocessing
        if( typeof(id)){
            id = id()
        }

        // execute operation
        let doc_ref = doc(db, collection_name, id)
        let snapshot = await getDoc(doc_ref)

        // postprocessing
        if( snapshot.exists() ){
            let result = snapshot.data()
            postprocessing(result)
            return result
        }
        else{
            console.log("do not exist")
            do_not_exist()
        }
    }
    catch (e){
        console.log(e)
        error()
    }
}

export const update_doc = async function (obj, collection_name, id, error = ()=>{}, postprocessing = ()=>{}, do_not_exist = ()=>{}){
    try{
        if (typeof(obj) == "function"){
            obj = obj()
        }
        if (typeof(id) == "function"){
            id = id()
        }

        // execute operation
        let doc_ref = doc(db, collection_name, id)
        let snapshot = await getDoc(doc_ref)


        if( snapshot.exists() ){
            await updateDoc(doc_ref, obj)
            // postprocessing
            postprocessing()
            console.log("ok")

        }
        else {
            console.log("do not exist")
            do_not_exist()
        }
    }
    catch (e) {
        console.log(e)
        error()
    }
}

export const update_by_function =  async function (collection_name,attribute_name, attribute, update_function, postprocessing= (item)=>{} ){
    try{
        if (typeof (attribute) == "function") {
            attribute = attribute()
        }
        let q = query(collection(db, collection_name), where(attribute_name, "==", attribute));

        let snapshot = await getDocs(q)

        snapshot.forEach((snap_item) => {
            update_doc( update_function(snap_item.data()), collection_name, snap_item.id)
        })
        postprocessing()

    }
    catch(e){
        console.log(e)
    }

}

export const delete_doc = async function(collection_name, id, error = ()=>{}, postprocessing = ()=>{}){
    try{
        // preprocessing
        if( typeof(id) == "function"){
            id = id()
        }

        // execute operation
        await deleteDoc(doc(db, collection_name, id))

        // postprocessing
        postprocessing()
        console.log("ok")
    }
    catch (e) {
        console.log(e)
        error()
    }
}


export const delete_doc_by_attribute = async function(collection_name, attribute_name, attribute, error = ()=>{}, postprocessing = ()=>{}){
    try{

        let q = query(collection(db, collection_name), where(attribute_name, "==", attribute));

        let snapshot = await getDocs(q)

        snapshot.forEach((snap_item) => {
            deleteDoc(doc(db, collection_name, snap_item.id))
        })

        // postprocessing
        postprocessing()
        console.log("ok")
    }
    catch (e) {
        console.log(e)
        error()
    }
}


export const count_docs = async function(attribute_val, collection_name, attribute_name){
    try{
        if (typeof (attribute_val) == "function") {
            attribute_val = attribute_val()
        }
        let q = query(collection(db, collection_name), where(attribute_name, "==", attribute_val));

        let snapshot = await getCountFromServer(q);
        return snapshot.data().count
    }
    catch(e){
        console.log(e)
    }
}

// da testare
export const get_docs_by_attribute = async function(attribute, collection_name, attribute_name, limit_number=null, order_by =null, order_direction = "asc", error = ()=>{}, postprocessing = ()=>{}, do_not_exist = ()=>{}){
    try{
        // preprocessing
        if( typeof(attribute) == "function"){
            attribute = attribute()
        }

        // execute operation
        let q
        if( limit_number == null && order_by == null){
            q = query(collection(db, collection_name), where(attribute_name, "==", attribute));
        }
        else if (limit_number == null){
            q = query(collection(db, collection_name), where(attribute_name, "==", attribute), orderBy(order_by, order_direction));
        }
        else if(order_by == null) {
            q = query(collection(db, collection_name), where(attribute_name, "==", attribute), limit(limit_number));
        }
        else{
            q = query(collection(db, collection_name), where(attribute_name, "==", attribute), orderBy(order_by, order_direction), limit(limit_number));
        }
        let snapshot = await getDocs(q)

        // postprocessing
        let result = []
        snapshot.forEach((snap_item) => {
            result.push({
                ...snap_item.data(),
                doc_id: snap_item.id
            })
        })
        postprocessing(result)
        return result
    }
    catch (e) {
        console.log(e)
        error()
    }

}

export const load_docs_by_attributes = async function (collection_name, attributes_name_value, order_by = null, order_direction = "asc", limit_number = null, error = () => {
}, postprocessing = () => {
}) {
    let query = firebase.firestore().collection(collection_name)
    for (let attribute_name in attributes_name_value) {
        query = query.where(attribute_name, "==", attributes_name_value[attribute_name])
    }
    if (order_by != null) {
        query = query.orderBy(order_by, order_direction)
    }
    if (limit_number != null) {
        query = query.limit(limit_number)
    }
    let snapshot = await getDocs(query)

    // postprocessing
    let result = []
    snapshot.forEach((snap_item) => {
        result.push({
            ...snap_item.data(),
            doc_id: snap_item.id
        })
    })
    postprocessing(result)
    return result
}



export const load_ordered_docs = async function (collection_name, order_by_field, order_direction="asc", max_item_number = null, error = ()=>{}, postprocessing = ()=>{}) {
    try {

        let q
        // execute operation
        if (max_item_number == null) {
            q = query(collection(db, collection_name),orderBy(order_by_field, order_direction));
        } else {
            q = query(collection(db, collection_name),orderBy(order_by_field, order_direction), limit(max_item_number));
        }

        let snapshot = await getDocs(q)
        // postprocessing
        let result = []
        snapshot.forEach((snap_item) => {
            result.push({
                ...snap_item.data(),
                doc_id: snap_item.id
            })
        })
        postprocessing(result)
        return result
    } catch (e) {
        console.log(e)
        error()
    }
}

export const query_by_preamble = async function (collection_name, attribute, search_word, max_item_number = null, efficient=true, order_by_field = null, error = ()=>{}, postprocessing = ()=>{}){
    if(efficient){
        return await query_by_preamble_efficient(collection_name, attribute, search_word, max_item_number, error, postprocessing)
    }
    else{
        return await query_by_preamble_no_efficient(collection_name, attribute, search_word, order_by_field, max_item_number, error, postprocessing)
    }
}

const query_by_preamble_efficient = async function (collection_name, attribute, search_word, max_item_number = null, error = ()=>{}, postprocessing = ()=>{}) {
    try {
        // preprocessing
        if (typeof (attribute) == "function") {
            attribute = attribute()
        }
        let q = query(collection(db, collection_name), where(attribute, ">=", search_word), limit(max_item_number));


        let snapshot = await getDocs(q)
        // postprocessing
        let result = []
        snapshot.forEach((snap_item) => {
            result.push({
                ...snap_item.data(),
                doc_id: snap_item.id
            })
        })
        postprocessing(result)
        return result
    }
    catch (e) {
        console.log(e)
        error()
    }
}



const query_by_preamble_no_efficient = async function (collection_name, attribute, search_word, order_by_field, max_item_number = null, error = ()=>{}, postprocessing = ()=>{}) {
    try {
        // preprocessing
        if (typeof (attribute) == "function") {
            attribute = attribute()
        }

        let q = query(collection(db, collection_name), orderBy(order_by_field, "desc"),orderBy(attribute));


        let snapshot = await getDocs(q)
        // postprocessing
        let result = []
        snapshot.forEach((snap_item) => {
            if(snap_item.data()[attribute] >= search_word && snap_item.data()[attribute] < search_word+"\uf8ff" && result.length < max_item_number){
                result.push(snap_item.data())
            }
            if(result.length >= max_item_number){
                return result
            }
        })
        postprocessing(result)
        return result
    } catch (e) {
        console.log(e)
        error()
    }
}

