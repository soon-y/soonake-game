export default [
    {
        name: 'environmentMapTexture',
        type: 'cubeTexture',
        path:
        [
            'textures/environmentMap/px.jpg',
            'textures/environmentMap/nx.jpg',
            'textures/environmentMap/py.jpg',
            'textures/environmentMap/ny.jpg',
            'textures/environmentMap/pz.jpg',
            'textures/environmentMap/nz.jpg'
        ]
    },
    {
        name: 'fieldNormal',
        type: 'texture',
        path:
        [
            'textures/floorMap/FloorsCheckerboard_Normal.jpg'
        ]
    },
    {
        name: 'fieldTexture',
        type: 'texture',
        path:
        [
            'textures/floorMap/FloorsCheckerboard_Diffuse.jpg'
        ]
    },    
    {
        name: 'floorTexture',
        type: 'texture',
        path:
        [
            'textures/floorMap/floor_diff.jpg'
        ]
    },
    {
        name: 'floorNormal',
        type: 'texture',
        path:
        [
            'textures/floorMap/floor_normal.jpg'
        ]
    },
    {
        name: 'appleDiff',
        type: 'texture',
        path: 'textures/appleMap/Apple_BaseColor.jpg'
    },
    {
        name: 'appleNormal',
        type: 'texture',
        path: 'textures/appleMap/Apple_Normal.png'
    },
    {
        name: 'appleRough',
        type: 'texture',
        path: 'textures/appleMap/Apple_Roughness.jpg'
    },
    {
        name: 'wall',
        type: 'gltfModel',
        path: 'models/wall.glb'
    },
    {
        name: 'head',
        type: 'gltfModel',
        path: 'models/head.glb'
    },
    {
        name: 'body1',
        type: 'gltfModel',
        path: 'models/body1.glb'
    },
    {
        name: 'body2',
        type: 'gltfModel',
        path: 'models/body2.glb'
    },
    {
        name: 'kenpizel',
        type: 'ttf',
        path: 'font/ttf/kenpixel.ttf'
    },
    {
        name: 'apple',
        type: 'objModel',
        path: 'models/apple.obj'
    },
    {
        name: 'screenImage',
        type: 'texture',
        path: 'textures/screenMap/screenImage.jpg'
    }
]