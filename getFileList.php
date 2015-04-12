<?php
/**
 * @Author: White
 * @Date:   2015-04-01 23:00:52
 * @Last Modified by:   white
 * @Last Modified time: 2015-04-12 14:07:18
 */
$t = array(
    array(
        'status'=>0,
        'name'=>'upload',
        'path'=>'//upload',
        'size'=>103,
        'modify'=>1425722349,
        'type'=>'dir'
    ),
    array(
        'status'=>0,
        'name'=>'test.pdf',
        'path'=>'/test.pdf',
        'size'=>103,
        'modify'=>1425722349,
        'type'=>'file'
    ),
    array(
        'status'=>0,
        'name'=>'test.doc',
        'path'=>'//test.doc',
        'size'=>103,
        'modify'=>1425722349,
        'type'=>'file'
    ),
    array(
        'status'=>0,
        'name'=>'test',
        'path'=>'/test',
        'size'=>103,
        'modify'=>1425722349,
        'type'=>'dir'
    ),
    array(
        'status'=>0,
        'name'=>'ke.html',
        'path'=>'/ke.html',
        'size'=>103,
        'modify'=>1425722349,
        'type'=>'file'
    )
);
echo json_encode($t);