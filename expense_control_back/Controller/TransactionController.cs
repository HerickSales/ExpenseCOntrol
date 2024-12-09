
using ExpenseControl.Data.Dto;
using ExpenseControl.Services;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseControl.Controller
{

    [Route("[controller]")]
    [ApiController]
    [Produces("application/json")]

    //Fazer token e hashear senha
    public class TransactionController(UnitOfService service) : ControllerBase
    {
        private UnitOfService _service = service;

        [HttpPost]
        public ActionResult CreateTransaction(CreateTransactionDto dto)
        {
            try{
                var result = _service.TransactionService.CreateTransaction(dto);
                if (result.IsSuccess)
                {
                    return Ok(result.Successes.FirstOrDefault());
                }
                return BadRequest(result.Errors.FirstOrDefault());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpDelete("{Id}")]
        public ActionResult DeleteTransaction(int Id)
        {
            try{
                var result= _service.TransactionService.DeleteTransaction(Id);
                if (result.IsSuccess)
                {
                    return Ok(result.Successes.FirstOrDefault());
                }
                return BadRequest(result.Errors.FirstOrDefault());


            }catch(Exception e){
                return BadRequest(e.Message);
            }
        }
        [HttpPut("{Id}")]
        public ActionResult UpdateTransaction(UpdateTransactionDto dto, int Id)
        {
            try{
                var result= _service.TransactionService.UpdateTransaction(dto, Id);
                if (result.IsSuccess)
                {
                    return Ok(result.Successes.FirstOrDefault());
                }
                return BadRequest(result.Errors.FirstOrDefault());
            }catch(Exception e){
                return BadRequest(e.Message);
            }
        }
    }
}