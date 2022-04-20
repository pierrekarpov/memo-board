import * as _ from 'lodash';

/** Store Helpers: to simplify reducers when updating store state.
 *  Assumes ID is the unique identifier */

/**  Replace collection with entities */
const setAll = (entities: any[]) => {
    return entities;
};

/**  Add one entity to the start of the collection */
const addFirst = (entity: any, collection: any[]) => {
    return [entity, ...collection];
};

/**  Add one entity to the end of the collection */
const addLast = (entity: any, collection: any[]) => {
    return [...collection, entity];
};

/**  Add multiple entities to the collection */
const addMany = (entities: any[], collection: any[]) => {
    return _.concat(collection, entities);
};

/**  Replace one entity in the collection */
const setOne = (entity: any, collection: any[]) => {
    return _.map(collection, (item) => _.isEqual(entity.id, item.id) ? entity : item);
};

/** Updates the properties of an entity in the collection */
const updateOne = (entity: any, collection: any[]) => {
    // const entityToUpdate =  R.find((item) => R.equals(entity.id, item.id), collection);
    const entityToUpdate = _.find(collection, (item) => _.isEqual(entity.id, item.id));
    if (entityToUpdate) {
        _.each(_.keys(entityToUpdate), (key) => {
            if (key in entity) {
                entityToUpdate[key] = entity[key];
            }
        })
        return setOne(entityToUpdate, collection);
    }

    return collection;
};

/**  Add or replace one entity in the collection */
const upsertOne = (entity: any, collection: any[]) => {
    const index = _.findIndex(collection, (item) => _.isEqual(entity.id, item.id))
    if (index >= 0) {
        return _.map(collection, (item, item_index) => _.isEqual(index, item_index) ? entity : item);
    }
    return addLast(entity, collection);
};

/**  Add or replace one entity in the collection */
const upsertMany = (entities: any[], collection: any[]) => {
    let updatedCollection = _.clone(collection);
    _.each(entities, (entity: any) => {
        updatedCollection = upsertOne(entity, updatedCollection);
    });

    return updatedCollection;
};

/**  Remove one entity in the collection */
const removeOne = (id: number, collection: any[]) => {
    return _.filter(collection, (entity: any) => !_.isEqual(id, entity.id));
};

/**  Remove multiple entities in the collection */
const removeMany = (ids: number[], collection: any[]) => {
    return _.filter(collection, (entity: any) => !_.includes(ids, entity.id));
};

/**  Remove all entities in the collection */
const removeAll = () => {
    return [];
};

export default {
    addFirst,
    addLast,
    addMany,
    removeOne,
    removeMany,
    removeAll,
    setAll,
    setOne,
    upsertOne,
    upsertMany,
    updateOne,
};
