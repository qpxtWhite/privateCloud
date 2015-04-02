<?php
/**
 * @Author: White
 * @Date:   2015-04-01 23:00:52
 * @Last Modified by:   white
 * @Last Modified time: 2015-04-02 01:42:09
 */
$t = array(
    array(
        'status'=>0,
        'name'=>'upload',
        'path'=>'/upload',
        'size'=>103,
        'modify'=>1425722349,
        'type'=>'dir'
    ),
    array(
        'status'=>0,
        'name'=>'test.pdf',
        'path'=>'/upload/test.pdf',
        'size'=>103,
        'modify'=>1425722349,
        'type'=>'file'
    ),
    array(
        'status'=>0,
        'name'=>'test.doc',
        'path'=>'/',
        'size'=>103,
        'modify'=>1425722349,
        'type'=>'file'
    ),
    array(
        'status'=>0,
        'name'=>'test.xls',
        'path'=>'/',
        'size'=>103,
        'modify'=>1425722349,
        'type'=>'file'
    ),
    array(
        'status'=>0,
        'name'=>'test',
        'path'=>'/',
        'size'=>103,
        'modify'=>1425722349,
        'type'=>'file'
    )
);
echo json_encode($t);