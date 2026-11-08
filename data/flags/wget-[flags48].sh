#!/bin/bash
"$@"
############################################################################
echo ""
echo "-----------------------------------"
echo "   WGET DOWNLOADER nopoxob¹½"
echo "-----------------------------------"
############################################################################
############################################################################
# WGET SHELL DOWNLOADER SCRIPT nopoxob½¾
############################################################################
#$0 > SCRIPT #$1 > argue1 #$2 > argue2 #setting variables > argue1=$1
#$(basename $value) = ${value##*/}
############################################################################
SCRIPT_FOLDER_0PARENT=${0%/*}      #${PWD%/*}   1PARENT
SCRIPT_FOLDER_1PARENT=${0%/*/*}    #${PWD%/*/*} 2PARENT
SCRIPT_FOLDER_2PARENT=${0%/*/*/*}  #${PWD%/*/*} 3PARENT

SCRIPTFOLDER=${0%/*} #$PWD or #curDIR #/path/to/
SCRIPTFULLPATH=${0} #/path/to/script.sh

PROGNAME=$(basename $0) : '#shellscriptname.sh' file $PROGNAME 

SCRIPTNAME_wPATH=$0
SCRIPTNAME=$(basename $0) #${0##*/} #shellscriptname.sh
SCRIPTNAME_woEXT=${SCRIPTNAME%.*} #shellscriptname

#############################################################################
SCRIPTNAMEwoV=${SCRIPTNAME_woEXT:0:5}  # cut first n chars  #(| cut -c n-)
SCRIPTNAMEV=${SCRIPTNAME_woEXT:5}
#############################################################################
#SCRIPTNAMEV=${SCRIPTNAMEV%?}  # cut last n chars
#SCRIPTNAMEV=${SCRIPTNAMEV:0:0}

echo "SCRIPTNAMEwoV:"$SCRIPTNAMEwoV

SCRIPTNAMEV=${SCRIPTNAMEV#"["}
SCRIPTNAMEV=${SCRIPTNAMEV%"]"}

echo "SCRIPTNAMEV:"$SCRIPTNAMEV

#SCRIPTNAMEV=${SCRIPTNAMEV%;} #remove only a semicolon at the end:

curDIRFULLPATH=${PWD} #$SCRIPTFOLDER
curDIR=$(basename $PWD) #${PWD##*/}

APTNAME=$(basename $SCRIPT_FOLDER_0PARENT)

echo "SCRIPT_FULL_PATH       :"$SCRIPTFULLPATH
echo "SCRIPT_FOLDER          :"$SCRIPTFOLDER
echo "SCRIPT_FOLDER_1PARENT  :"$SCRIPT_FOLDER_1PARENT
echo "SCRIPT_NAME            :"$SCRIPTNAME
echo "SCRIPT_NAME_woEXT      :"$SCRIPTNAME_woEXT
echo
echo "# arguments called with ---->  ${@}     "
echo "# \$1 ---------------------->  $1       "
echo "# \$2 ---------------------->  $2       "
echo "# SCRIPT FULL PATH---------->  ${0}"
echo "# SCRIPT FOLDER------------->  ${0%/*}  "
echo "# SCRIPT NAME--------------->  ${0##*/} "
echo 
##VARIABLES#################################################################

PROGNAME=$(basename $0)
parentdir1=${PWD%/*}
parentdir2=${PWD%/*/*}
currentdir=${PWD##*/}

APTNAME=$(basename $parentdir2)
APTNAME=$(basename $parentdir1)
APTNAME=$(basename $currentdir)

curDIRFULLPATH=${PWD} #$SCRIPTFOLDER
curDIR=$(basename $PWD) #${PWD##*/}

################################################################################

##VARIABLES#################################################################
USERNAME=whoami
VAR=$PWD #FULL_PATH

if [ -z "${SCRIPTNAMEV}" ]
then
  echo "VAR is unset or set to the empty string"
  VAR="$APTNAME"
elif [ $SCRIPTNAMEV == "[]" ]
then
  echo "var is empty"
  VAR="empty"
else
  echo "var is $SCRIPTNAMEV"
  VAR=$SCRIPTNAMEV
fi

############################################################################
#$SCRIPTNAME_woEXT
############################################################################
function mainFuncLNX() 
{

echo "VAR:"$VAR

old="|"
new='\/'

VAR="$(sed s/['|']/$new/g <<<$VAR)"

echo "nVAR:"$VAR


#################################
#wget -O FILE URL
#################################


#wget $url -o $name
#declare -a arr
#read -a arr < $VAR 

#echo $arr

#for i in "${arr[@]}";
#do 
#	url=${arr[0,0]}
#	name=${arr[0,1]}
#	echo "$name"
	#wget $url -O $name
#done


cat $VAR | while read LINE
do
	#echo $LINE
	url=$(echo $LINE | awk '{ print $1 }')
	name=$(echo $LINE | awk '{ print $2 }')

	wget $url -O $name 
	
done 


#while read LINE ; do
#  wget "http://example.com/$LINE" -O $(echo $LINE|sed 's=/=-=')
#done < uri.txt

############################################################################	 
############################################################################
}

#OSPROBE####################################################################
case "$OSTYPE" in
  linux*)   echo "OSTYPE:LINUX" 
mainFuncLNX;;
  darwin*)  echo "OSTYPE:OSX" ;; 
  msys*)    echo "OSTYPE:WINDOWS" ;;
  solaris*) echo "OSTYPE:SOLARIS" ;;
  bsd*)     echo "OSTYPE:BSD" ;;
  *)        echo "OSTYPE:UNKNOWN" ;;
esac
############################################################################
echo "#################################################################END"
exec "$SHELL"
